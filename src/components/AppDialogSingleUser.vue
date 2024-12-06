<template>
  <div v-if="getSelectedUser">
    <div v-if="!showChangePasswordModel && !showUserImageModel" class="row">
      <div class="col-xs-12">
        <div
          v-if="isCurrentUsersProfile || store.state.isCommander"
          class="edit-users-image"
        >
          <ProfilePanel
            :bg-color="getSelectedUser.userImage.bgColor"
            :user-initials="getSelectedUser.userImage.initials"
            :hide-initials="getSelectedUser.userImage.hideInitials"
            :user-name="getSelectedUser.name"
            :is-image="!getSelectedUser.userImage.bgColor.includes('--')"
          />

          <ButtonWrapper :align-as-row="true">
            <template #buttons>
              <ButtonType
                :btn-class="'btn-small'"
                :btn-text="textTruncate('Profilbild bearbeiten', 15)"
                :type-button="true"
                @click="showUserImageModel = !showUserImageModel"
              />

              <ButtonType
                :btn-class="'btn-small'"
                :btn-text="textTruncate('Passwort ändern', 15)"
                :type-button="true"
                @click="showChangePasswordModel = !showChangePasswordModel"
              />
            </template>
          </ButtonWrapper>
        </div>
      </div>

      <template v-if="store.state.isMajor || isCurrentUsersProfile">
        <div class="col-lg-6 col-xs-12">
          <InputType
            :id="'name'"
            :label="'Name'"
            :input-type="'text'"
            :input-placeholder="'Name'"
            v-model:modelValue="getSelectedUser.name"
            :error-message="nameError ? 'Dieses Feld darf nicht leer sein' : ''"
          />
        </div>

        <div class="col-lg-6 col-xs-12">
          <InputType
            :id="'surname'"
            :label="'Nachname'"
            :input-type="'text'"
            :input-placeholder="'Nachname'"
            v-model:modelValue="getSelectedUser.surname"
            :error-message="
              surNameError ? 'Dieses Feld darf nicht leer sein' : ''
            "
          />
        </div>

        <div class="col-lg-6 col-xs-12">
          <InputType
            :id="'position'"
            :label="'Position'"
            :input-type="'text'"
            :input-placeholder="'Position'"
            v-model:modelValue="getSelectedUser.position"
          />
        </div>

        <div class="col-lg-6 col-xs-12">
          <InputType
            :id="'jerseyNumber'"
            :label="'Spielernummer'"
            :input-type="'number'"
            :min-val="1"
            :max-val="99"
            :input-placeholder="'Spielernummer'"
            pattern="[0-9]*"
            v-model:modelValue="getSelectedUser.jerseyNumber"
            :error-message="
              jerseyNumberError
                ? 'Es sind nur Zahlen zwischen 1-99 erlaubt. Wenn dir keine Spielernummer zugeteilt wurde, kannst du die <q>0</q> auswählen. Auf deinem Profil wird dann <q>k.A.</q> ausgegeben.'
                : ''
            "
          />
        </div>

        <div class="col-xs-12">
          <InputType
            :id="'birthday'"
            :label="'Geburtstag'"
            :input-type="'date'"
            v-model:modelValue="formattedDate"
            @update:model-value="updateUsersBirthday"
          />
        </div>

        <div class="col-xs-12">
          <template v-if="formattedDate === '1955-01-01'">
            <BadgeType
              :badge-type="'info'"
              :badge-text="'Bei diesem Datum wird nur <q>k.A.</q> auf deinem Profil ausgegeben'"
            />
          </template>
        </div>
      </template>

      <div v-if="store.state.isSergeant" class="col-xs-12">
        <InputType
          :id="'debts'"
          :label="'Offener Betrag MK'"
          :input-type="'number'"
          :input-placeholder="'Offener Betrag MK'"
          pattern="[0-9,]*"
          v-model:modelValue="getSelectedUser.debts"
          :error-message="debtsError ? 'Negative Werte sind nicht erlaubt' : ''"
        />
      </div>

      <div class="col-xs-12">
        <PromoteUser
          v-if="store.state.isMajor"
          :name="getSelectedUser.name"
          :roles="JSON.parse(getSelectedUser.role)"
          @update-roles="handleRolesUpdate"
          :throw-error="promotionError"
        />
      </div>

      <div class="col-xs-12">
        <CheckboxType
          v-if="store.state.isSergeant"
          :label="'Trainingsanzug bekommen?'"
          :id="'user-got-suit'"
          :value="getSelectedUser.gotSuit"
          :no-border="store.state.isSergeant && !isCurrentUsersProfile"
          @update:model-value="updateGotSuit"
        />
      </div>

      <div
        v-if="isCurrentUsersProfile || store.state.isMajor"
        class="col-xs-12"
      >
        <InjuredDropdown
          :is-injured="getSelectedUser.isInjured"
          :users-name="getSelectedUser.name"
          :is-current-users-profile="isCurrentUsersProfile"
          @update:is-injured="updateInjuredStatus"
        />
      </div>

      <div v-if="store.state.isMajor" class="col-xs-12">
        <CheckboxType
          :label="`${getSelectedUser.name} Zugriff auf die Web-App gewähren?`"
          :id="'set-active-status'"
          :value="getSelectedUser.userIsActivated"
          @update:model-value="updateUserActivated"
          :no-border="true"
        />
        <template v-if="!getSelectedUser.userIsActivated">
          <BadgeType
            :badge-type="'warning'"
            :badge-text="`Mit dieser Einstellung blockierst du den Zugriff von ${getSelectedUser.name} auf die Web-App`"
          />
        </template>
      </div>

      <div class="col-xs-12">
        <ButtonType
          :type-button="true"
          :btn-text="'Änderungen speichern'"
          :btn-class="'w-100 mt-8'"
          @click="handleUserAction()"
        />
        <BadgeType
          v-if="errorWasThrown"
          :badge-type="'error'"
          :badge-text="'Überprüfe deine Einstellungen! Änderungen können nicht gespeichert werden.'"
          :additional-class="'event'"
        />
      </div>
    </div>
    <div
      v-if="showChangePasswordModel && isCurrentUsersProfile"
      class="change-password"
    >
      <div class="row">
        <div class="col-xs-12">
          <InputType
            :id="'old-password'"
            :label="'Aktuelles Password eingeben'"
            :input-type="'password'"
            :input-placeholder="'Aktuelles Passwort'"
            v-model:modelValue="oldPassword"
            :error-message="oldPasswordError ? 'Feld darf nicht leer sein' : ''"
          />
        </div>
        <div class="col-xs-12 col-lg-6">
          <InputType
            :id="'new-password'"
            :label="'Neues Password eingeben'"
            :input-type="'password'"
            :input-placeholder="'Dein neues Passwort'"
            v-model:modelValue="newPassword"
          />
        </div>
        <div class="col-xs-12 col-lg-6">
          <InputType
            :id="'confirm-new-password'"
            :label="'Neues Password bestätigen'"
            :input-type="'password'"
            :input-placeholder="'Passwort bestätigen'"
            v-model:modelValue="confirmPassword"
            :error-message="
              passwordError
                ? 'Das Passwort muss mindestens 8 Zeichen lang sein, einen Kleinbuchstaben, einen Großbuchstaben, eine Nummer und ein Sonderzeichen enthalten. Oder Passwörter stimmen nicht überein.'
                : ''
            "
          />
        </div>

        <div class="col-xs-12">
          <BadgeType
            :badge-type="isError ? 'error' : 'success'"
            :badge-text="responseMessage"
          />
        </div>

        <div class="col-xs-12">
          <ButtonWrapper>
            <template #buttons>
              <ButtonType
                :type-button="true"
                :btn-text="'Passwort ändern'"
                :btn-class="'w-100'"
                @click="
                  handleChangePassword(
                    oldPassword,
                    newPassword,
                    confirmPassword
                  )
                "
              />

              <ButtonType
                :type-button="true"
                :btn-text="'Zurück'"
                :btn-class="'w-100 btn-secondary'"
                @click="showChangePasswordModel = !showChangePasswordModel"
              />
            </template>
          </ButtonWrapper>
        </div>
      </div>
    </div>
    <div
      v-if="!showChangePasswordModel && showUserImageModel"
      class="change-profile-image"
    >
      <template v-if="isCurrentUsersProfile || store.state.isCommander">
        <ProfilePanel
          :user-name="getSelectedUser.name"
          :user-initials="getSelectedUser.userImage.initials"
          :hide-initials="getSelectedUser.userImage.hideInitials"
          :bg-color="getSelectedUser.userImage.bgColor"
          :is-image="!getSelectedUser.userImage.bgColor.includes('--')"
        />
        <ColorPicker
          v-model:selectedColor="getImageColor"
          :id="getSelectedUser.id"
          :is-current-users-profile="isCurrentUsersProfile"
          :username="getSelectedUser.username"
          @update:selected-color="updateSelectedColor"
        />

        <ButtonWrapper>
          <template #buttons>
            <ButtonType
              :type-button="true"
              :btn-text="'Änderungen bestätigen'"
              :btn-class="'w-100'"
              @click="showUserImageModel = !showUserImageModel"
            />
          </template>
        </ButtonWrapper>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useUser } from '@/composables/useUser.ts';
import { useRouter } from 'vue-router';
import { getInitials } from '@/helpers/getInitials.ts';
import { validatePassword } from '@/helpers/validatePassword.ts';
import { textTruncate } from '@/helpers/textTruncate.ts';
import store from '@/store';
import { UserData, Color } from '@/interface';
import InputType from '@/components/InputType.vue';
import CheckboxType from '@/components/CheckboxType.vue';
import PromoteUser from '@/components/PromoteUser.vue';
import ProfilePanel from '@/components/ProfilePanel.vue';
import InjuredDropdown from '@/components/InjuredDropdown.vue';
import BadgeType from '@/components/BadgeType.vue';
import ButtonType from '@/components/ButtonType.vue';
import ButtonWrapper from '@/components/ButtonWrapper.vue';
import ColorPicker from '@/components/ColorPicker.vue';

const router = useRouter();
const getSelectedUser = ref<UserData | null>(null);
const realImage = ref(false);
const {
  getUserByID,
  updateUserByID,
  setUserFields,
  changePassword,
  responseMessage,
  isError,
  selectedUser,
} = useUser();

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  isCurrentUsersProfile: {
    type: Boolean,
    default: false,
  },
});

const getImageColor = ref([
  {
    name: 'Default',
    color: '--primary',
    image: false,
  },
]);

const updateSelectedColor = (color: Color) => {
  if (getSelectedUser.value) {
    getSelectedUser.value.userImage.bgColor = color.color;

    if (color.realImage) {
      realImage.value = color.realImage;
      getSelectedUser.value.userImage.hideInitials = color.realImage;
    }
  }
};

/* change user image */
const showUserImageModel = ref(false);

const nameError = ref(false);
const surNameError = ref(false);
const jerseyNumberError = ref(false);
const debtsError = ref(false);
const promotionError = ref(false);

/* change password */
const showChangePasswordModel = ref(false);
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref(false);
const oldPasswordError = ref(false);

const errorWasThrown = ref(false);

const handleChangePassword = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  oldPasswordError.value = oldPassword.length <= 0;
  passwordError.value = !validatePassword(newPassword, confirmPassword);

  if (!passwordError.value) {
    changePassword(store.state.userData.id, oldPassword, newPassword);
  }
};

const handleUserAction = () => {
  // Early return if getSelectedUser is null
  if (!getSelectedUser.value) return;

  const updateInitials = ref(
    `${getInitials(getSelectedUser.value.name)}${getInitials(getSelectedUser.value.surname)}`
  );
  getSelectedUser.value.userImage.initials = updateInitials.value;
  getSelectedUser.value.userImage.hideInitials = realImage.value;

  /* error validation */
  nameError.value = !getSelectedUser.value.name;
  surNameError.value = !getSelectedUser.value.surname;
  jerseyNumberError.value = !(
    getSelectedUser.value.jerseyNumber !== null &&
    getSelectedUser.value.jerseyNumber &&
    getSelectedUser.value.jerseyNumber >= 0 &&
    getSelectedUser.value.jerseyNumber <= 99
  );
  debtsError.value = !/^\d+([.,]\d{1,2})?$/.test(
    String(getSelectedUser.value.debts)
  );
  promotionError.value =
    getSelectedUser.value.role === '[]' || !getSelectedUser.value.role;

  if (
    !nameError.value &&
    !surNameError.value &&
    !jerseyNumberError.value &&
    !debtsError.value &&
    !promotionError.value
  ) {
    const updates = {
      name: getSelectedUser.value.name,
      surname: getSelectedUser.value.surname,
      position: getSelectedUser.value.position,
      jerseyNumber: getSelectedUser.value.jerseyNumber,
      birthday: formattedDate.value,
      gotSuit: getSelectedUser.value.gotSuit,
      debts: getSelectedUser.value.debts,
      userIsActivated: getSelectedUser.value.userIsActivated,
      role: getSelectedUser.value.role,
      accessRights: usersAccessRights.value,
      isInjured: getSelectedUser.value.isInjured,
      initials: getSelectedUser.value.userImage.initials,
      hideInitials: getSelectedUser.value.userImage.hideInitials,
    };

    setUserFields(getSelectedUser.value, updates);
    updateUserByID(props.id, router);
  } else {
    if (
      nameError.value ||
      surNameError.value ||
      jerseyNumberError.value ||
      debtsError.value ||
      promotionError.value
    ) {
      errorWasThrown.value = true;
    }
  }
};

const usersBirthday = ref<string>('');
const formattedDate = computed(() => {
  return usersBirthday.value
    ? new Date(usersBirthday.value).toISOString().split('T')[0]
    : '';
});

const updateUsersBirthday = (newDate: string | number | Date) => {
  if (newDate instanceof Date) {
    usersBirthday.value = newDate.toISOString().split('T')[0];
  } else if (typeof newDate === 'string' || typeof newDate === 'number') {
    const parsedDate = new Date(newDate);
    if (!isNaN(parsedDate.getTime())) {
      usersBirthday.value = parsedDate.toISOString().split('T')[0];
    } else {
      console.error('Ungültiges Datumsformat:', newDate);
    }
  } else {
    console.error('Unbekannter Typ für newDate:', newDate);
  }
};

const updateGotSuit = (gotSuit: boolean) => {
  if (getSelectedUser.value) {
    getSelectedUser.value.gotSuit = gotSuit;
  }
};

const updateUserActivated = (setUserActiveStatus: boolean) => {
  if (getSelectedUser.value) {
    getSelectedUser.value.userIsActivated = setUserActiveStatus;
  }
};

const usersAccessRights = ref('');

const handleRolesUpdate = (newRoles: Array<string>) => {
  if (getSelectedUser.value) {
    getSelectedUser.value.role = JSON.stringify(newRoles);
  }

  /* handle access rights */
  if (newRoles.includes('Trainer') || newRoles.includes('Co-Trainer')) {
    usersAccessRights.value = 'svf_major';
  } else if (newRoles.includes('Kassenwart')) {
    usersAccessRights.value = 'svf_sergeant';
  } else if (newRoles.includes('Mannschaftsrat')) {
    usersAccessRights.value = 'svf_corporal';
  } else {
    usersAccessRights.value = 'svf_private';
  }
};

const updateInjuredStatus = (injured: boolean) => {
  if (getSelectedUser.value) {
    getSelectedUser.value.isInjured = injured;
  }
};

onMounted(async () => {
  await getUserByID(props.id);

  if (selectedUser.value) {
    getSelectedUser.value = selectedUser.value;

    const birthday = selectedUser.value.birthday;

    if (birthday) {
      const parsedDate = new Date(birthday);

      if (!isNaN(parsedDate.getTime())) {
        usersBirthday.value = parsedDate.toISOString().split('T')[0];
      } else {
        console.error('Ungültiges Datumsformat:', birthday);
      }
    } else {
      console.error('Geburtstag nicht vorhanden.');
    }

    if (selectedUser.value.accessRights) {
      usersAccessRights.value = selectedUser.value.accessRights;
    }

    if (selectedUser.value.userImage) {
      getImageColor.value = [
        {
          name: 'Default',
          color: selectedUser.value.userImage.bgColor,
          image: !!selectedUser.value.userImage.bgImage,
        },
      ];
    }
  } else {
    console.warn('Benutzer konnte nicht gefunden werden');
  }
});
</script>

<style scoped lang="scss">
.edit-users-image {
  padding: 0 0 rem(20px);
  margin: 0 0 rem(40px);
  border-bottom: 1px solid var(--border-color);

  .button-wrapper {
    margin-top: rem(20px);

    > * {
      width: 50%;
      max-width: 50%;
    }
  }

  @include media-breakpoint-up(md) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .button-wrapper {
      margin-top: 0;
    }
  }
}

.change-profile-image {
  .button-wrapper {
    margin-top: rem(20px);
  }
}
</style>
