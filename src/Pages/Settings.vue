<template>
  <SectionType :class="'mt-0'">
    <template #sectionContent>
      <div class="users-pipeline">
        <div class="users-pipeline__header">
          <div class="row">
            <div class="col-lg-9 col-xs-12">
              <h2>Übersicht: Inaktive oder offene Anfragen</h2>

              <div class="body-text-b2">
                <p>
                  Hier findest du eine Übersicht über die Nutzer, die entweder
                  manuell als inaktiv markiert wurden oder auf eine Bestätigung
                  warten, um Zugriff auf die Web-App zu erhalten. Solltest du
                  einen Namen nicht erkennen, kannst du diesen gerne ablehnen.
                  Sollte dir ein Fehler unterlaufen, hast du jederzeit die
                  Möglichkeit, die Nutzer über die Liste unten zu bestätigen.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ul
          v-if="usersInPipeline && usersInPipeline.length > 0"
          class="users-pipeline__list blanklist"
        >
          <li v-for="user in usersInPipeline" :key="user.id">
            <ProfilePanel
              :bg-color="user.userImage.bgColor"
              :user-initials="user.userImage.initials"
              :user-name="user.name + ' ' + user.surname"
              :is-image="!user.userImage.bgColor.includes('--')"
              :add-border="true"
            />

            <ButtonWrapper :align-as-row="true">
              <template #buttons>
                <ButtonType
                  :type-button="true"
                  :btn-text="'Akzeptieren'"
                  :btn-class="'btn-light btn-light--success'"
                  @click="handleUserAction(user, 'accept')"
                />
                <ButtonType
                  :type-button="true"
                  :btn-class="'btn-light btn-light--error'"
                  :btn-text="'Ablehnen'"
                  @click="handleUserAction(user, 'decline')"
                />
              </template>
            </ButtonWrapper>
          </li>
        </ul>

        <BadgeType
          v-else
          :badge-type="'success'"
          :badge-text="'Alle offenen Anfragen wurden bestätigt'"
        />
      </div>
    </template>
  </SectionType>

  <SectionType>
    <template #sectionContent>
      <div class="users-pipeline">
        <div class="users-pipeline__header">
          <div class="row">
            <div class="col-lg-9 col-xs-12">
              <h2>Übersicht: Abgelehnte Nutzer</h2>

              <div class="body-text-b2">
                <p>
                  Hier ist eine Übersicht der Nutzer die abgelehnt worden sind.
                  Über <q>Nutzer blockieren</q> kannst du E-Mail, als auch
                  Username auf eine Blacklist schreiben. E-Mail und Username
                  können sich so nicht mehr für die App registrieren.
                  <u
                    >Der&nbsp;Eintrag des Nutzers wird automatisch vom Server
                    gelöscht.</u
                  >
                </p>

                <p>
                  Falls dir ein Fehler unterlaufen ist und ein Name aus deinem
                  Team betroffen ist, kannst du diesen Nutzer dennoch über
                  <q>Nutzer aktivieren</q> freischalten und ihm Zugriff auf die
                  Web-App gewähren.
                </p>
              </div>
            </div>
          </div>
        </div>
        <ul
          class="users-pipeline__list blanklist"
          v-if="rejectedUsers && rejectedUsers.length > 0"
        >
          <li v-for="user in rejectedUsers" :key="user.id">
            <ProfilePanel
              :bg-color="user.userImage.bgColor"
              :user-initials="user.userImage.initials"
              :user-name="user.name + ' ' + user.surname"
            />

            <ButtonWrapper :align-as-row="true">
              <template #buttons>
                <ButtonType
                  :type-button="true"
                  :btn-text="'Nutzer aktivieren'"
                  :btn-class="'btn-light btn-light--success'"
                  @click="handleUserAction(user, 'accept')"
                />
                <ButtonType
                  :type-button="true"
                  :btn-text="'Nutzer blockieren'"
                  :btn-class="'btn-light btn-light--error'"
                  @click="handleBlockUser(user.id, user.email, user.username)"
                />
              </template>
            </ButtonWrapper>
          </li>
        </ul>
        <BadgeType
          v-else
          :badge-type="'info'"
          :badge-text="'Aktuell gibt es keine Nutzer die abgelehnt oder inaktiv sind'"
        />
      </div>
    </template>
  </SectionType>

  <SectionType>
    <template #sectionContent>
      <div class="users-pipeline">
        <div class="users-pipeline__header">
          <div class="row">
            <div class="col-lg-9 col-xs-12">
              <h2>Übersicht: Geblockte Nutzer</h2>

              <div class="body-text-b2">
                <p>
                  Übersicht aller geblockten Nutzer. Diese Benutzernamen oder
                  E-Mails können sich nicht mehr für die Web-App registrieren.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ul
          v-if="blockList && blockList.length > 0"
          class="users-pipeline__list users-pipeline__list--alt blanklist"
        >
          <li v-for="(user, index) in blockList" :key="user.id">
            <div class="count">
              <strong>
                {{ index > 10 ? index + 1 : `0${index + 1}` }}
              </strong>
            </div>
            <div class="item">
              <strong>E-Mail:</strong><span>{{ user.email }}</span>
            </div>
            <div class="item">
              <strong>Benutzername:</strong><span>{{ user.username }}</span>
            </div>

            <ButtonWrapper :align-as-row="true">
              <template #buttons>
                <ButtonType
                  :type-button="true"
                  :btn-text="'Blockierung aufheben'"
                  :btn-class="'btn-light btn-light--error'"
                  @click="unblockUserByID(user.id, router)"
                />
              </template>
            </ButtonWrapper>
          </li>
        </ul>
        <BadgeType
          v-else
          :badge-type="'info'"
          :badge-text="'Die Blockliste ist leer'"
        />
      </div>
    </template>
  </SectionType>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/composables/useUser.ts'
import { UserData } from '@/interface'
import store from '@/store'
import ProfilePanel from '@/components/ProfilePanel.vue'
import ButtonType from '@/components/ButtonType.vue'
import ButtonWrapper from '@/components/ButtonWrapper.vue'
import SectionType from '@/components/SectionType.vue'
import BadgeType from '@/components/BadgeType.vue'

const router = useRouter()

const {
  updateUserByID,
  setUserFields,
  blockUserByID,
  unblockUserByID,
  fetchBlockList,
  blockList,
} = useUser()
const { fetchAllUsers, completeUserData } = useUser()

const usersInPipeline = ref<UserData[]>([])
const rejectedUsers = ref<UserData[]>([])

const handleUserAction = (user: UserData, action: string) => {
  const updates = {
    userIsActivated: action === 'accept',
    gotRejected: action === 'decline',
  }
  setUserFields(user, updates)
  updateUserByID(user.id, router)
}

const handleBlockUser = (userID: number, email: string, username: string) => {
  blockUserByID(userID, email, username, router)
}

onMounted(async () => {
  store.pageHeadline('Einstellungen')
  await fetchAllUsers()
  await fetchBlockList()

  usersInPipeline.value = completeUserData.value.filter(
    (user) => !user.userIsActivated && !user.gotRejected,
  )
  rejectedUsers.value = completeUserData.value.filter((user) => {
    const isBlocked = blockList.value.some(
      (blockedUser) =>
        blockedUser.email === user.email ||
        blockedUser.username === user.username,
    )
    return !user.userIsActivated && user.gotRejected && !isBlocked
  })
})
</script>

<style scoped lang="scss">
.users-pipeline {
  &__header {
    margin-bottom: rem(20px);

    h2,
    .h2 {
      margin-bottom: rem(10px);
    }
  }

  &__list {
    li {
      display: flex;
      align-items: center;

      &:not(:last-child) {
        padding-bottom: rem(20px);
        margin-bottom: rem(20px);
        border-bottom: 1px solid var(--border-color);
      }

      .button-wrapper {
        margin-left: auto;
      }
    }

    &--alt {
      li {
        display: flex;
        flex-direction: row;

        .count {
          margin-right: rem(20px);
          padding-right: rem(20px);
          position: relative;

          &::after {
            content: '';
            height: 100%;
            width: 1px;
            background: var(--border-color);
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }

        .item {
          display: flex;
          gap: rem(5px);
          margin-right: rem(20px);
        }

        .button-wrapper {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
