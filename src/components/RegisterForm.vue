<template>
  <div class="register">
    <template v-if="fetchStorageRegisteredValue !== 'yes'">
      <ul
        :class="[
          'register__steps blanklist',
          { 'register__steps--step-1': stepOne },
          { 'register__steps--step-2': stepTwo },
          { 'register__steps--step-3': stepThree },
        ]"
      >
        <li>
          <i class="icon-check"></i>
          <span>Schritt 1</span>
        </li>
        <li>
          <i class="icon-check"></i>
          <span>Schritt 2</span>
        </li>
        <li>
          <i class="icon-check"></i>
          <span>Schritt 3</span>
        </li>
      </ul>
      <!-- Required -->
      <div v-if="stepOne" class="register__item">
        <div class="register__item-body">
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <InputType
                :id="'name'"
                :label="'Name'"
                :input-type="'text'"
                :input-placeholder="'z.B. Dennis'"
                v-model:model-value="name"
                :error-message="nameError ? 'Feld darf nicht leer sein' : ''"
              />
            </div>

            <div class="col-xs-12 col-md-6">
              <InputType
                :id="'surname'"
                :label="'Nachname'"
                :input-type="'text'"
                :input-placeholder="'z.B. Haas'"
                v-model:model-value="surname"
                :error-message="surnameError ? 'Feld darf nicht leer sein' : ''"
              />
            </div>

            <div class="col-xs-12 col-md-6">
              <InputType
                :id="'username'"
                :label="'Benutzername'"
                :input-type="'text'"
                :input-placeholder="'z.B. dennis'"
                v-model:model-value="username"
                :error-message="
                  usernameError
                    ? 'Feld darf nicht leer sein, Benutzername existiert bereits oder Name wurde vom Admin blockiert'
                    : ''
                "
              />
            </div>

            <div class="col-xs-12 col-md-6">
              <InputType
                :id="'email'"
                :label="'E-Mail Adresse'"
                :input-type="'email'"
                :input-placeholder="'mail@mail.de'"
                v-model:model-value="email"
                :error-message="
                  emailError
                    ? 'E-Mail ist nicht valide, existiert nicht oder wurde vom Admin blockiert'
                    : ''
                "
              />
            </div>

            <div class="col-xs-12">
              <InputType
                :id="'password'"
                :label="'Passwort'"
                :input-type="'password'"
                :input-placeholder="'Passwort'"
                v-model:model-value="password"
              />
            </div>

            <div class="col-xs-12">
              <ValidatePasswordInfo
                v-show="password.length > 0"
                :password="password"
              />
            </div>

            <div class="col-xs-12">
              <InputType
                :id="'repeat-password'"
                :label="'Passwort wiederholen'"
                :input-type="'password'"
                :input-placeholder="'Passwort'"
                v-model:model-value="repeatPassword"
                :error-message="
                  passwordError ? 'Passwörter stimmen nicht überein' : ''
                "
              />
            </div>
          </div>
        </div>

        <ButtonType
          :type-button="true"
          :btn-class="'w-100'"
          :btn-text="'Weiter'"
          @click="
            navigateInsideForm(
              'stepTwo',
              name,
              surname,
              username,
              email,
              password,
              repeatPassword,
            )
          "
        />
      </div>

      <!-- Optional -->
      <div v-if="stepTwo" class="register__item">
        <div class="register__item-body">
          <ul class="blanklist">
            <InputType
              :id="'position'"
              :label="'Position (Optional)'"
              :input-type="'text'"
              :input-placeholder="'z.B. Stürmer'"
              v-model:model-value="position"
            />
            <InputType
              :id="'jerseyNumber'"
              :label="'Spielernummer (Optional)'"
              :input-type="'number'"
              :input-placeholder="'z.B. Stürmer'"
              :min-val="1"
              :max-val="99"
              pattern="[0-9]*"
              v-model.number="jerseyNumber"
              :error-message="
                jerseyNumberError
                  ? 'Spielernummer muss zwischen 1-99 liegen. Wenn du keine Nummer zugewiesen bekommen hast, trage die 0 ein'
                  : ''
              "
            />
            <InputType
              :id="'birthday'"
              :label="'Geburtstag (Optional)'"
              :input-type="'date'"
              :input-placeholder="''"
              v-model:model-value="birthday"
            />
          </ul>
        </div>

        <ButtonWrapper>
          <template #buttons>
            <ButtonType
              :type-button="true"
              :btn-class="'w-100'"
              :btn-text="'Weiter'"
              @click="
                navigateInsideForm(
                  'stepThree',
                  name,
                  surname,
                  username,
                  email,
                  password,
                  repeatPassword,
                  jerseyNumber,
                )
              "
            />

            <ButtonType
              :type-button="true"
              :btn-class="'btn-secondary w-100'"
              :btn-text="'Schritt zurück'"
              @click="
                navigateInsideForm(
                  'stepOne',
                  name,
                  surname,
                  username,
                  email,
                  password,
                  repeatPassword,
                  jerseyNumber,
                )
              "
            />
          </template>
        </ButtonWrapper>
      </div>

      <!-- Vorgegeben (Kann aber auch geändert werden) -->
      <div v-if="stepThree" class="register__item">
        <div class="register__item-body">
          <ProfilePanel
            :user-name="`${name} ${surname}`"
            :user-initials="initials"
            :bg-color="bgColor"
            :is-image="!bgColor.includes('--')"
          />

          <ColorPicker
            :id="1"
            v-model:selectedColor="getImageColor"
            @update:selected-color="updateSelectedColor"
          />
          <!-- id for default init -->
        </div>

        <ButtonWrapper>
          <template #buttons>
            <ButtonType
              :btn-class="'w-100'"
              :btn-text="'Registrierung abschließen'"
              :type-button="true"
              @click="navigateInsideForm('handleRegister')"
            />
            <ButtonType
              :btn-class="'btn-secondary w-100'"
              :btn-text="'Schritt zurück'"
              :type-button="true"
              @click="
                navigateInsideForm(
                  'stepTwo',
                  name,
                  surname,
                  username,
                  email,
                  password,
                  repeatPassword,
                  jerseyNumber,
                )
              "
            />
          </template>
        </ButtonWrapper>
      </div>
    </template>
    <template v-else>
      <BadgeType
        :badge-type="'info'"
        :badge-text="'Du hast dich bereits registriert. Habe ein wenig Geduld.'"
        :badge-centered="true"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useAuth } from '@/composables/useAuth.ts'
import { validateMail } from '@/helpers/validateMail.ts'
import { validatePassword } from '@/helpers/validatePassword.ts'
import { getInitials } from '@/helpers/getInitials.ts'
import { useUser } from '@/composables/useUser.ts'
import { BlockList, UserData } from '@/interface'
import ButtonType from '@/components/ButtonType.vue'
import BadgeType from '@/components/BadgeType.vue'
import ButtonWrapper from '@/components/ButtonWrapper.vue'
import InputType from '@/components/InputType.vue'
import ValidatePasswordInfo from '@/components/ValidatePasswordInfo.vue'
import ProfilePanel from '@/components/ProfilePanel.vue'
import ColorPicker from '@/components/ColorPicker.vue'

const stepOne = ref(true)
const stepTwo = ref(false)
const stepThree = ref(false)

const {
  name,
  surname,
  username,
  email,
  password,
  repeatPassword,
  position,
  jerseyNumber,
  birthday,
  bgColor,
  bgImage,
  initials,
  handleRegister,
} = useAuth()

const { fetchAllUsers, fetchBlockList, completeUserData, blockList } = useUser()
const router = useRouter()
const { loadValue } = useLocalStorage('alreadyRegistered', 'no')
const fetchStorageRegisteredValue = ref('')

const getAllUsers = ref<UserData[]>([])
const getAllBlockedUsers = ref<BlockList[]>([])

const nameError = ref(false)
const surnameError = ref(false)
const usernameError = ref(false)
const emailError = ref(false)
const passwordError = ref(false)
const jerseyNumberError = ref(false)

const liveCompareWithAPI = (
    email: string | undefined,
    username: string | undefined,
    data: Array<{ email: string; username: string }>,
) => {
  // Early exit if email or username is undefined
  if (!email || !username) {
    return; // Exit the function early if either is undefined
  }

  let forbiddenEmail = false
  let forbiddenUsername = false

  for (const user of data) {
    if (user.email === email) {
      forbiddenEmail = true
      emailError.value = forbiddenEmail
    }

    if (user.username === username) {
      forbiddenUsername = true
      usernameError.value = forbiddenUsername
    }

    if (forbiddenEmail && forbiddenUsername) {
      break
    }
  }
}

const navigateInsideForm = (
    nextStep: string,
    name?: string,
    surname?: string,
    username?: string,
    email?: string,
    password?: string,
    repeatPassword?: string,
    jerseyNumber?: number,
) => {
  if (nextStep === 'stepTwo') {
    /* validate password */
    nameError.value = !name || name.length === 0;
    surnameError.value = !surname || surname.length === 0;
    usernameError.value = !username || username.length === 0;
    emailError.value = !email || !validateMail(email ?? '');
    passwordError.value = !password || !repeatPassword || !validatePassword(password, repeatPassword);

    // Check for errors and exit if any exist
    if (nameError.value || surnameError.value || usernameError.value || emailError.value || passwordError.value) {
      return; // Exit early if there is an error
    }

    liveCompareWithAPI(email, username, getAllUsers.value)
    liveCompareWithAPI(email, username, getAllBlockedUsers.value)

    // Proceed to the next step
    stepOne.value = false;
    stepTwo.value = true;
    stepThree.value = false;

    /* pass current initials to register form */
    initials.value = `${getInitials(name ?? '')}${getInitials(surname ?? '')}`;

  } else if (nextStep === 'stepThree') {
    // Validate jersey number
    if (jerseyNumber === 0 || !jerseyNumber || jerseyNumber < 1 || jerseyNumber > 99) {
      jerseyNumberError.value = true;
      return; // Exit early if jersey number is invalid
    } else {
      jerseyNumberError.value = false;
    }

    // Proceed to the next step
    stepOne.value = false;
    stepTwo.value = false;
    stepThree.value = true;

  } else if (nextStep === 'handleRegister') {
    handleRegister(router);

  } else {
    stepOne.value = true;
    stepTwo.value = false;
    stepThree.value = false;
  }
}

const getImageColor = ref([
  {
    name: 'Default',
    color: bgColor.value,
    image: !!bgImage.value,
  },
])

const updateSelectedColor = (color: any) => {
  bgColor.value = color.color
}

onMounted(async () => {
  fetchStorageRegisteredValue.value = loadValue()
  await fetchAllUsers()
  await fetchBlockList()
  getAllUsers.value = completeUserData.value
  getAllBlockedUsers.value = blockList.value
})
</script>

<style scoped lang="scss">
.register {
  &__steps {
    display: flex;
    margin-bottom: rem(20px);
    padding-bottom: rem(20px);
    border-bottom: 1px solid var(--border-color);

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: $font-size-14;
      position: relative;
      width: 33.3%;
      max-width: 33.3%;

      &::before {
        content: '';
        width: calc(100% - #{rem(30px)});
        height: rem(2px);
        background: var(--gray-dark);
        position: absolute;
        top: rem(8px);
        right: calc(-50% - #{rem(-15px)});
      }

      [class*='icon-'] {
        background: var(--gray-dark);
        color: var(--white);
        border-radius: 50%;
        width: rem(18px);
        height: rem(18px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $font-size-10;
        margin-bottom: rem(5px);
        z-index: 1;
      }

      &:last-child {
        &::before {
          display: none;
        }
      }
    }

    &--step-1 {
      li {
        &:first-child {
          [class*='icon-'] {
            background: var(--primary);
          }

          &::before {
            background: var(--primary);
          }
        }
      }
    }

    &--step-2 {
      li {
        &:first-child,
        &:nth-child(2) {
          [class*='icon-'] {
            background: var(--primary);
          }
        }

        &:first-child {
          &::before {
            background: var(--primary);
          }
        }
      }
    }

    &--step-3 {
      li {
        [class*='icon-'] {
          background: var(--primary);
        }

        &::before {
          background: var(--primary);
        }
      }
    }
  }

  &__item-body {
    margin-bottom: rem(30px);
  }
}
</style>
