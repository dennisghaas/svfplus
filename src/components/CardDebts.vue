<template>
  <CardFrame
    :card-body-b-g="genBG(debts, role)"
    :card-header-b-g="genBG(debts, role)"
    :text-color-default="false"
  >
    <template #cardHeaderLeft>
      <h4>Teamkasse</h4>
    </template>

    <template #cardBody>
      <div class="card-debts--content">
        <span class="text-right">Offener Beitrag:</span>
        <template
          v-if="role.includes('Trainer') || role.includes('Co-Trainer')"
        >
          <span class="h1 font-weight-600 text-right">Befreit</span>
        </template>
        <template v-else>
          <span class="h1 font-weight-600 text-right"
            >{{ debts.toFixed(2) }}&nbsp;€</span
          >
        </template>
      </div>
    </template>
  </CardFrame>
</template>

<script setup lang="ts">
import CardFrame from '@/components/CardFrame.vue';

defineProps({
  debts: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: () => [],
  },
});

const genBG = (debts: number, role: string) => {
  /* touch this again not working properly */
  /* || !role.includes('Trainer') || !role.includes('Co-Trainer') */
  if (debts <= 0 || role.includes('Trainer') || role.includes('Co-Trainer')) {
    return 'bg-success-mint';
  } else {
    return 'bg-primary';
  }
};
</script>

<style scoped lang="scss">
.card-debts {
  &--content {
    display: flex;
    flex-direction: column;
    margin-top: rem(5px);
  }
}
</style>
