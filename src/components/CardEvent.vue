<template>
  <CardFrame
    :card-header-b-g="displayBackgroundColorOnEventType(eventType)"
    :card-overlay="showEditModeDialog"
    :no-calendar="isAbstimmung"
    :is-preview="preview"
  >
    <template #cardModal>
      <EditModeDialog
        v-if="showEditModeDialog && !preview"
        :event-id="id"
        :event-type="eventType"
        @close-dialog="handleShowEditModeDialog()"
      />
    </template>

    <template #cardHeaderLeft>
      <h4>
        {{
          isAbstimmung
            ? voteMultipleSelection
              ? `Abstimmung (Mehrfachauswahl)`
              : `Abstimmung (Nur eine Stimme)`
            : eventType !== 'Spiel'
              ? `${title}`
              : `${venue}`
        }}
      </h4>

      <div class="body-text-b3 text-color-white-75">
        {{ isAbstimmung ? voteQuestion : subtitle }}
      </div>
    </template>

    <template #cardHeaderRight>
      <CardViewCalendar
        v-if="!isAbstimmung"
        :day="formattedDate?.day || ''"
        :month="formattedDate?.month || ''"
        :weekday="formattedDate?.weekday || ''"
      />

      <AppButton
        v-if="
          (!preview && store.state.isMajor) ||
          (eventType === 'Abstimmung' && store.state.isCorporal)
        "
        :label="'Event bearbeiten'"
        :additional-class="`bg-white ${displayBackgroundColorOnEventType(eventType, true)}`"
        :icon="'icon-settings'"
        @click="handleShowEditModeDialog()"
      />
    </template>

    <template #cardBody>
      <div class="card--body__event">
        <template v-if="!isAbstimmung">
          <ul class="card-body__event-details blanklist">
            <li>
              <span class="card-body__event-details--info">Treffen</span>
              <span>{{ displayEventDetails(meetAt) }}</span>
            </li>
            <li>
              <span class="card-body__event-details--info">Beginn</span>
              <span>{{ displayEventDetails(beginAt) }}</span>
            </li>
            <li>
              <span class="card-body__event-details--info">Ende</span>
              <span>{{ displayEventDetails(endAt) }}</span>
            </li>
          </ul>

          <div class="body-text-b2 text-color-black-75">
            <p v-if="!notNominated">
              {{ description }}
            </p>
            <p v-else>
              Auch wenn du für dieses Spiel nicht nominiert worden bist, würde
              sich dein Team über deinen Support an der Seitenlinie freuen.
            </p>
          </div>

          <address v-if="eventType !== 'Training'">
            <ul
              v-if="(venueStreet && venuePostalCode) || linkExtern"
              class="card-body__event-address blanklist"
            >
              <li v-if="venueStreet && venuePostalCode">
                <span>Adresse:</span>
                <a
                  class="text-color-black-75 text-right"
                  :href="`https://www.google.de/maps/place/${venueStreet},+${venuePostalCode}`"
                  target="_blank"
                >
                  {{ venueStreet }}, {{ venuePostalCode }}
                </a>
              </li>
              <li v-if="linkExtern">
                <LinkExternalFussballDe :link="linkExtern" />
              </li>
            </ul>
          </address>
        </template>

        <template v-else>
          <!--          <template v-if="!voteMultipleSelection">
            <RadioType
                :radio="voteOptions"
                :name="`question_${id}`"
                :id="id"
            />
          </template>
          <template v-else>
            <div>
              <CheckboxType
                  v-for="(checkbox, index) in voteOptions"
                  :key="checkbox.text"
                  :id="`checkbox_${checkbox.text}_${index + 1}`.toLowerCase()"
                  :label="checkbox.text"
              />
            </div>
          </template>-->
        </template>

        <BadgeType
          v-if="showCountdown && !notNominated && !preview"
          :badge-type="'warning'"
          :badge-text="countdown"
          :badge-centered="true"
          :badge-alt="true"
          :badge-no-icon="true"
          :additional-class="'event'"
        />

        <BadgeType
          v-if="countdownExpired && !notNominated && !preview"
          :badge-type="'error'"
          :badge-text="countdown"
          :badge-centered="true"
          :badge-alt="true"
          :additional-class="'event'"
        />

        <BadgeType
          :additional-class="'event'"
          v-if="notNominated && !preview"
          :badge-alt="true"
          :badge-centered="true"
          :badge-type="'error'"
          :badge-text="'Du wurdest für dieses Spiel nicht nominiert'"
        />

        <CardEventControls
          v-if="!isAbstimmung && !preview"
          :not-nominated="notNominated"
          :player-with-no-access="playerWithNoAccess"
          :event-i-d="id"
          :is-allowed-to-click-on-control="
            countdown === 'Zeit zum reagieren abgelaufen'
          "
        />

        <nav v-else>
          <ButtonType
            v-if="!countdownExpired && !preview"
            :type-submit="true"
            :btn-class="'btn-secondary w-100'"
            :btn-text="'Absenden'"
          />
        </nav>
      </div>
    </template>
  </CardFrame>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import store from '@/store';
import { formatDate } from '@/helpers/formatDate.ts';
import { useCountdown } from '@/composables/useCountdown.ts';
import { VoteOption } from '@/interface';
import CardFrame from '@/components/CardFrame.vue';
import CardViewCalendar from '@/components/CardViewCalendar.vue';
import BadgeType from '@/components/BadgeType.vue';
import LinkExternalFussballDe from '@/components/LinkExternalFussballDe.vue';
// import RadioType from "@/components/RadioType.vue";
// import CheckboxType from "@/components/CheckboxType.vue";
import ButtonType from '@/components/ButtonType.vue';
import AppButton from '@/components/AppButton.vue';
import EditModeDialog from '@/components/EditModeDialog.vue';
import CardEventControls from '@/components/CardEventControls.vue';

const showEditModeDialog = ref(false);
const handleShowEditModeDialog = () => {
  showEditModeDialog.value = !showEditModeDialog.value;
};

/* create computed from event Date with formatDate Helper function */
const formattedDate = computed(() => formatDate(props.eventDate));

/* add computed to check if a player is not nominated for a game */
const possibleNotNominatedEventTypes = ['Training', 'Spiel', 'Feier'];
const notNominated = computed(() => {
  return possibleNotNominatedEventTypes.some(
    (type) =>
      type === props.eventType &&
      props.playerWithNoAccess.includes(store.state.userData.id.toString())
  );
});

const displayBackgroundColorOnEventType = (
  eventType: string,
  useTextColor?: boolean
) => {
  const prefix = useTextColor ? 'text-color' : 'bg';
  if (eventType === 'Spiel') {
    return `${prefix}-blue-light-gray`;
  } else if (eventType === 'Feier') {
    return `${prefix}-blue-dark-gray`;
  } else if (eventType === 'Abstimmung') {
    return `${prefix}-blue-primary`;
  } else {
    return `${prefix}-blue-soft-gray`;
  }
};

const displayEventDetails = (time: string) => {
  if (!time) {
    return '-';
  }

  return time;
};

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  eventType: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  eventDate: {
    type: String,
    default: '',
  },
  meetAt: {
    type: String,
    default: '',
  },
  beginAt: {
    type: String,
    default: '',
  },
  endAt: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  playerWithNoAccess: {
    type: Array,
    default: () => [],
  },
  venue: {
    type: String,
    default: '',
  },
  venueStreet: {
    type: String,
    default: '',
  },
  venuePostalCode: {
    type: String,
    default: '',
  },
  linkExtern: {
    type: String,
    default: '',
  },
  timeToReact: {
    type: String,
    default: '',
  },
  voteOptions: {
    type: Array as () => VoteOption[],
    default: () => [],
  },
  voteQuestion: {
    type: String,
    default: '',
  },
  voteMultipleSelection: {
    type: Boolean,
    default: false,
  },
  preview: {
    type: Boolean,
    default: false,
  },
});

const isAbstimmung = ref(props.eventType === 'Abstimmung');

const { startCountdown, showCountdown, countdownExpired, countdown } =
  useCountdown();
startCountdown(props.timeToReact);
</script>

<style scoped lang="scss">
.card-body {
  &__event {
    &-details {
      display: flex;
      padding-bottom: rem(15px);
      border-bottom: 1px solid var(--border-color);
      margin-bottom: rem(15px);

      li {
        display: flex;
        flex-direction: column;
        width: 33.3%;
        max-width: 33.3%;
      }

      &--info {
        font-size: $font-size-14;
        color: var(--black-75);
      }
    }

    &-address {
      margin: rem(15px) 0;

      li {
        display: flex;
        gap: rem(10px);
        margin-bottom: rem(15px);

        &:last-child {
          margin-bottom: 0;
        }

        a {
          width: 100%;
        }
      }
    }
  }
}
</style>
