<template>
  <SectionType :class="'mt-0'">
    <template #sectionContent>
      <div class="create-form-page">
        <div v-if="!eventCreatedSuccessful" class="create-form-page__create-event">
          <ul class="step-navigation blanklist">
            <li
                v-for="(step, index) in steps"
                :key="index"
                :class="[
            'step-navigation--item',
            {
              'step-navigation--item__is-active':
                store.state.createCardSelected.includes(step.id),
            },
          ]"
            >
              <button
                  type="button"
                  @click="handleForm(step.id)"
                  :disabled="store.state.createCardSelected.length - 1 < index"
              >
            <span class="step-navigation--item--control-icon">
              <i
                  :class="
                  store.state.createCardSelected.includes(step.id)
                    ? 'icon-check'
                    : 'icon-close'
                "
              ></i>
            </span>
                <span>
              <strong>{{ step.step }}</strong>
              <template v-if="isDesktop">
                - {{ step.name }}
              </template>
            </span>
              </button>
            </li>
          </ul>

          <div class="row">
            <div
                v-if="store.state.createCardSelected.includes('meta')"
                class="col-xl-4 col-xs-12"
            >
              <div
                  v-show="isMobile ?  store.state.createCardSelected[store.state.createCardSelected.length - 1] === 'meta' : true"
                  :class="[
              'create-form-card',
              {
                'create-form-card__is-active':
                  store.state.createCardSelected[
                    store.state.createCardSelected.length - 1
                  ] === 'meta',
              },
            ]"
              >
                <h3 v-if="isMobile">Meta Daten erstellen</h3>
                <CreateFormCardMeta/>
              </div>
            </div>
            <div
                v-if="store.state.createCardSelected.includes('desc')"
                class="col-xl-4 col-xs-12"
            >
              <div
                  v-show="isMobile ?  store.state.createCardSelected[store.state.createCardSelected.length - 1] === 'desc' : true"
                  :class="[
              'create-form-card',
              {
                'create-form-card__is-active':
                  store.state.createCardSelected[
                    store.state.createCardSelected.length - 1
                  ] === 'desc',
              },
            ]"
              >
                <h3 v-if="isMobile">Beschreibung für Event</h3>
                <CreateFormCardDesc/>
              </div>
            </div>
            <div
                v-if="store.state.createCardSelected.includes('result')"
                class="col-xl-4 col-xs-12"
            >
              <div
                  v-show="isMobile ?  store.state.createCardSelected[store.state.createCardSelected.length - 1] === 'result' : true"
                  :class="[
              'create-form-card',
              {
                'create-form-card__is-active':
                  store.state.createCardSelected[
                    store.state.createCardSelected.length - 1
                  ] === 'result',
              },
            ]"
              >
                <h3 v-if="isMobile">Event kontrollieren</h3>
                <CreateFormCardResult/>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="create-form-page__create-new-event">
          <div class="create-form-page__create-new-event--header">
            <div class="animation">
              <CheckAnimation/>
            </div>
            <h2 class="text-center">Event wurde erfolgreich erstellt!</h2>
          </div>

          <div class="body-text-b2 text-center text-color-black-75">
            <p>
              Das Event ist nun in deinem Kalender oder Dashboard der Nutzer
              sichtbar.<br/>
              Über den Button kannst du weitere Events hinzufügen.
            </p>
          </div>

          <div class="row">
            <div class="col-xs-12 d-flex justify-content-center">
              <ButtonType
                  :btn-text="'Neues Event erstellen'"
                  :btn-class="'w-max-content spacing-top'"
                  :type-button="true"
                  @click="createNewEvent()"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </SectionType>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useBreakpoint} from '@/composables/useBreakpoint.ts'
import {useEvents} from '@/composables/useEvents.ts'
import store from '@/store'
import {steps} from '@/config.ts'
import CreateFormCardMeta from '@/components/CreateFormCardMeta.vue'
import CreateFormCardDesc from '@/components/CreateFormCardDesc.vue'
import CreateFormCardResult from '@/components/CreateFormCardResult.vue'
import ButtonType from '@/components/ButtonType.vue'
import CheckAnimation from '@/components/CheckAnimation.vue'
import SectionType from "@/components/SectionType.vue";

const {isMobile, isDesktop} = useBreakpoint()

const handleForm = (step: string) => {
  store.updateCreateCardSelected(step)
}

const {eventCreatedSuccessful, createNewEvent} = useEvents()

onMounted(() => {
  store.pageHeadline('Erstellen')
})
</script>

<style scoped lang="scss">
.create-form-page {
  &__create-new-event {
    background: var(--white);
    border-radius: rem(10px);
    padding: rem(40px);

    &--header {
      h2 {
        margin-bottom: rem(20px);
      }

      .animation {
        max-width: rem(60px);
        margin: 0 auto rem(20px);
      }
    }
  }
}

.step-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &--item {
    width: 100%;
    margin-bottom: rem(20px);

    button {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;

      &[disabled] {
        cursor: not-allowed;
      }
    }

    &--control-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: rem(24px);
      height: rem(24px);
      background: var(--gray-dark);
      border-radius: 50%;
      font-size: rem(8px);
      margin-bottom: rem(10px);

      .icon-check {
        font-size: rem(12px);
      }

      [class*='icon-'] {
        color: var(--white);
      }
    }

    &__is-active {
      .step-navigation--item--control-icon {
        background: var(--primary);
      }
    }
  }
}

.create-form-card {
  background: var(--white);
  border-radius: rem(10px);
  padding: rem(20px);
  position: relative;

  @include media-breakpoint-up(lg) {
    padding: rem(40px);
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--white-75);
    z-index: 1;
    opacity: 1;
    transition: $transition-fast;
    pointer-events: none;
  }

  &__is-active {
    &::before {
      opacity: 0;
    }
  }

  h3,
  .h3 {
    margin-bottom: rem(20px);
  }

  @include media-breakpoint-up(xl) {
    padding: rem(40px) rem(20px);
  }

  @include media-breakpoint-up(xxl) {
    padding: rem(40px);
  }
}
</style>
