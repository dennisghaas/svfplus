<template>
  <div class="success-page">
    <div class="success-page__content">
      <h1>Erfolgreich registriert!</h1>

      <div class="body-text-b2">
        <p>
          Dein Account wurde erfolgreich registriert. Nur noch ein Schritt, dann
          kannst du auf die Web-App zugreifen.
          <u
            >Eine autorisierte Person muss deinen Account nur noch
            freischalten</u
          >
          🚀
        </p>

        <p>
          Sobald dein Account freigeschaltet ist, wird dich dein Trainer
          informieren.
        </p>
      </div>

      <BadgeType
        :additional-class="'event'"
        :badge-text="'Die in der Registrierungsstrecke definierten persönlichen Daten, kannst du sobald du eingeloggt bist, beliebig verändern.'"
        :badge-type="'info'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BadgeType from '@/components/BadgeType.vue';
</script>

<style scoped lang="scss">
.success-page {
  background: var(--white);
  padding: rem(20px);
  border-radius: rem(10px);
  box-shadow: $box-shadow-large;

  @include media-breakpoint-up(lg) {
    width: 50%;
    margin: 0 auto;
  }
}

h1 {
  margin-bottom: rem(20px);
}
</style>
