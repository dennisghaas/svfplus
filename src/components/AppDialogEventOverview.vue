<template>
  <div class="event-reaction-overview__wrapper">
    <div
        v-if="filteredUserData.keineReaktion.length > 0"
        class="event-reaction-overview"
    >
      <h3>
        Noch nicht reagiert ({{ filteredUserData.counts.keineReaktionCount }})
      </h3>
      <ul class="blanklist event-reaction-overview__list">
        <li
            v-for="user in filteredUserData.keineReaktion"
            :key="user.id"
            class="event-reaction-overview__item"
        >
          <div class="event-reaction-overview__item-image">
            <ProfilePanel
                :user-name="user.name + ' ' + user.surname"
                :bg-color="user.userImage.bgColor"
                :is-image="!user.userImage.bgColor.includes('--')"
                :user-initials="user.userImage.initials"
                :display-medium="true"
            />

            <span v-if="store.state.isMajor || isCurrentUsersProfile(user.id)" class="event-reaction-overview__reason">
              {{user.reason}}
            </span>
          </div>
          <div
              v-if="filterEventResponse(user.id)"
              class="event-reaction-overview__item-controls"
          >
            <template
                v-for="button in accessibleReactions"
                :key="button.reaction"
            >

              <ButtonCircle
                  :name="button.reaction"
                  :icon="button.icon"
                  :reaction="button.reaction"
                  :username="user.name"
                  :background="button.background"
                  :api-response="filterEventResponse(user.id).value?.response"
                  @click="sendResponse(button.reaction, user.id)"
              />
            </template>
          </div>
        </li>
      </ul>
    </div>

    <div
        v-if="filteredUserData.zusagen.length > 0"
        class="event-reaction-overview"
    >
      <h3>Zusagen ({{ filteredUserData.counts.zusagenCount }})</h3>
      <ul class="blanklist event-reaction-overview__list">
        <li
            v-for="user in filteredUserData.zusagen"
            :key="user.id"
            class="event-reaction-overview__item"
        >
          <div class="event-reaction-overview__item-image">
            <ProfilePanel
                :user-name="user.name + ' ' + user.surname"
                :bg-color="user.userImage.bgColor"
                :is-image="!user.userImage.bgColor.includes('--')"
                :user-initials="user.userImage.initials"
                :display-medium="true"
            />

            <span v-if="store.state.isMajor || isCurrentUsersProfile(user.id)" class="event-reaction-overview__reason">
              {{user.reason}}
            </span>

            <span v-if="user.id === selectEventResponses[0].userId">
            </span>
          </div>
          <div
              v-if="filterEventResponse(user.id)"
              class="event-reaction-overview__item-controls"
          >
            <template
                v-for="button in accessibleReactions"
                :key="button.reaction"
            >
              <ButtonCircle
                  :name="button.reaction"
                  :icon="button.icon"
                  :reaction="button.reaction"
                  :username="user.name"
                  :background="button.background"
                  :api-response="filterEventResponse(user.id).value?.response"
                  @click="sendResponse(button.reaction, user.id)"
              />
            </template>
          </div>
        </li>
      </ul>
    </div>

    <div
        v-if="filteredUserData.absagen.length > 0"
        class="event-reaction-overview"
    >
      <h3>Absagen / Abwesend ({{ filteredUserData.counts.absagenCount }})</h3>
      <ul class="blanklist event-reaction-overview__list">
        <li
            v-for="user in filteredUserData.absagen"
            :key="user.id"
            class="event-reaction-overview__item"
        >
          <div class="event-reaction-overview__item-image">
            <ProfilePanel
                :user-name="user.name + ' ' + user.surname"
                :bg-color="user.userImage.bgColor"
                :is-image="!user.userImage.bgColor.includes('--')"
                :user-initials="user.userImage.initials"
                :display-medium="true"
            />

            <span v-if="store.state.isMajor || isCurrentUsersProfile(user.id)" class="event-reaction-overview__reason">
              {{user.reason}}
            </span>
          </div>
          <div
              v-if="filterEventResponse(user.id)"
              class="event-reaction-overview__item-controls"
          >
            <template
                v-for="button in accessibleReactions"
                :key="button.reaction"
            >
              <ButtonCircle
                  :name="button.reaction"
                  :icon="button.icon"
                  :reaction="button.reaction"
                  :username="user.name"
                  :background="button.background"
                  :api-response="filterEventResponse(user.id).value?.response"
                  @click="sendResponse(button.reaction, user.id)"
              />
            </template>
          </div>
        </li>
      </ul>
    </div>

    <div
        v-if="filteredUserData.unsicher.length > 0"
        class="event-reaction-overview"
    >
      <h3>Unsicher ({{ filteredUserData.counts.unsicherCount }})</h3>
      <ul class="blanklist event-reaction-overview__list">
        <li
            v-for="user in filteredUserData.unsicher"
            :key="user.id"
            class="event-reaction-overview__item"
        >
          <div class="event-reaction-overview__item-image">
            <ProfilePanel
                :user-name="user.name + ' ' + user.surname"
                :bg-color="user.userImage.bgColor"
                :is-image="!user.userImage.bgColor.includes('--')"
                :user-initials="user.userImage.initials"
                :display-medium="true"
            />

            <span v-if="store.state.isMajor || isCurrentUsersProfile(user.id)" class="event-reaction-overview__reason">
              {{user.reason}}
            </span>
          </div>
          <div
              v-if="filterEventResponse(user.id)"
              class="event-reaction-overview__item-controls"
          >
            <template
                v-for="button in accessibleReactions"
                :key="button.reaction"
            >
              <ButtonCircle
                  :name="button.reaction"
                  :icon="button.icon"
                  :reaction="button.reaction"
                  :username="user.name"
                  :background="button.background"
                  :api-response="filterEventResponse(user.id).value?.response"
                  @click="sendResponse(button.reaction, user.id)"
              />
            </template>
          </div>
        </li>
      </ul>
    </div>

    <div
        v-if="filteredUserData.nichtNominiert.length > 0"
        class="event-reaction-overview"
    >
      <h3>
        Nicht nominiert ({{ filteredUserData.counts.nichtNominiertCount }})
      </h3>
      <ul class="blanklist event-reaction-overview__list">
        <li
            v-for="user in filteredUserData.nichtNominiert"
            :key="user.id"
            class="event-reaction-overview__item"
        >
          <div class="event-reaction-overview__item-image">
            <ProfilePanel
                :user-name="user.name + ' ' + user.surname"
                :bg-color="user.userImage.bgColor"
                :is-image="!user.userImage.bgColor.includes('--')"
                :user-initials="user.userImage.initials"
                :display-medium="true"
            />
          </div>
          <div
              v-if="filterEventResponse(user.id)"
              class="event-reaction-overview__item-controls"
          >
            <BadgeType
                :badge-text="'Nicht nominiert'"
                :badge-type="'error'"
                :badge-centered="true"
                :badge-alt="true"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, computed} from 'vue'
import {useUser} from '@/composables/useUser.ts'
import {useEventResponse} from '@/composables/useEventResponse.ts'
import {useRouter} from 'vue-router'
import {UserData} from '@/interface'
import ProfilePanel from '@/components/ProfilePanel.vue'
import ButtonCircle from '@/components/ButtonCircle.vue'
import BadgeType from '@/components/BadgeType.vue'
import store from "../store";

const {fetchAllUsers, completeUserData} = useUser()
const {fetchEventResponse, selectEventResponses} = useEventResponse()
const userData = ref<UserData[]>([])
const router = useRouter()
const props = defineProps({
  eventID: {
    type: Number,
    default: 0,
  },
  playerWithNoAccess: {
    type: Array,
    default: () => [],
  },
})

const filterEventResponse = (userId: number) => {
  return computed(() => {
    if (selectEventResponses.value) {
      return (
          selectEventResponses.value.find(
              (response) => response.userId === userId,
          ) || null
      )
    }
    return null
  })
}

const filteredUserData = computed(() => {
  const zusagenUsers = userData.value
      .filter(
          (user) =>
              user.username !== 'admin' &&
              user.accessRights !== 'svf_commander' &&
              user.userIsActivated &&
              !props.playerWithNoAccess.includes(user.id.toString()) &&
              selectEventResponses.value?.some(
                  (response) =>
                      response.userId === user.id && response.response === 'Zusagen',
              ),
      )
      .map((user) => {
        // Find the corresponding response for the user to get the reason
        const userResponse = selectEventResponses.value?.find(
            (response) =>
                response.userId === user.id && response.response === 'Zusagen',
        );

        return {
          ...user,
          reason: userResponse?.reason || '',
        };
      });

  const absagenUsers = userData.value
      .filter(
          (user) =>
              user.username !== 'admin' &&
              user.accessRights !== 'svf_commander' &&
              user.userIsActivated &&
              !props.playerWithNoAccess.includes(user.id.toString()) &&
              selectEventResponses.value?.some(
                  (response) =>
                      response.userId === user.id && response.response === 'Absagen',
              ),
      )
      .map((user) => {
        // Find the corresponding response for the user to get the reason
        const userResponse = selectEventResponses.value?.find(
            (response) =>
                response.userId === user.id && response.response === 'Absagen',
        );

        return {
          ...user,
          reason: userResponse?.reason || '',
        };
      });

  const unsicherUsers = userData.value
      .filter(
          (user) =>
              user.username !== 'admin' &&
              user.accessRights !== 'svf_commander' &&
              user.userIsActivated &&
              !props.playerWithNoAccess.includes(user.id.toString()) &&
              selectEventResponses.value?.some(
                  (response) =>
                      response.userId === user.id && response.response === 'Unsicher',
              ),
      )
      .map((user) => {
        // Find the corresponding response for the user to get the reason
        const userResponse = selectEventResponses.value?.find(
            (response) =>
                response.userId === user.id && response.response === 'Unsicher',
        );

        return {
          ...user,
          reason: userResponse?.reason || '',
        };
      });

  const keineReaktionUsers = userData.value
      .filter(
          (user) =>
              user.username !== 'admin' &&
              user.accessRights !== 'svf_commander' &&
              user.userIsActivated &&
              !props.playerWithNoAccess.includes(user.id.toString()) &&
              !selectEventResponses.value?.some(
                  (response) => response.userId === user.id,
              ),
      )
      .map((user) => ({
        ...user,
        reason: '',
      }));

  const nichtNominiertUsers = userData.value
      .filter(
          (user) =>
              user.username !== 'admin' &&
              user.accessRights !== 'svf_commander' &&
              user.userIsActivated &&
              props.playerWithNoAccess.includes(user.id.toString()),
      )

  return {
    zusagen: zusagenUsers,
    absagen: absagenUsers,
    unsicher: unsicherUsers,
    keineReaktion: keineReaktionUsers,
    nichtNominiert: nichtNominiertUsers,
    counts: {
      zusagenCount: zusagenUsers.length,
      absagenCount: absagenUsers.length,
      unsicherCount: unsicherUsers.length,
      keineReaktionCount: keineReaktionUsers.length,
      nichtNominiertCount: nichtNominiertUsers.length,
    },
  };
});

const accessibleReactions = ref([
  {
    reaction: 'Zusagen',
    icon: 'icon-thumb-up',
    background: '--success-light',
  },
  {
    reaction: 'Absagen',
    icon: 'icon-thumb-down',
    background: '--primary',
  },
  {
    reaction: 'Unsicher',
    icon: 'icon-question-mark',
    background: '--gray-dark',
  },
])

const isCurrentUsersProfile = (id: number) => {
  return id === store.state.userData.id;
}

const sendResponse = async (reaction: string, userID: number) => {
  if (store.state.isMajor) {
    const {eventResponse} = useEventResponse()
    await eventResponse(reaction, props.eventID, '', router, true, userID)
  } else {
    console.warn('Nur bestimmte Personen haben das Recht dazu, die Reaktionen der Spieler anzupassen');
  }
}

onMounted(async () => {
  await fetchAllUsers()
  await fetchEventResponse(props.eventID)
  userData.value = completeUserData.value
})
</script>

<style scoped lang="scss">
.event-reaction-overview {
  &__wrapper {
    .event-reaction-overview {
      margin-bottom: rem(60px);

      h3 {
        margin-bottom: rem(15px);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;

    .event-reaction-overview__item {
      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: 0;
      }
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: rem(10px);
    margin-bottom: rem(10px);
    border-bottom: 1px solid var(--border-color);

    &--order-first {
      order: -1;
    }

    &-controls {
      display: flex;
      flex-direction: row;
      gap: rem(5px);

      @include media-breakpoint-up(lg) {
        gap: 1rem;
      }
    }

    &-image {
      padding-right: rem(20px);
    }
  }

  &__reason {
    font-size: $font-size-14;
    color: var(--black-50);
    display: block;
    margin-top: rem(5px);
  }
}
</style>
