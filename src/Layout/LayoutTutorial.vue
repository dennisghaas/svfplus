<template>
  <div class="row">
    <div class="col-xs-12 col-xl-6">
      <div class="tutorial">
        <div class="container">
          <div class="tutorial__step">
            <template v-if="stepTwo">
              <h2>Über die Web-App</h2>
              <div class="body-text-b2">
                <p>
                  Diese App, ist wie ihr wahrscheinlich bereits gesehen habt,
                  keine „richtige“ App. Das liegt daran, dass für Apps auf iOS
                  eine Lizenzgebühr anfällt, die das Budget dieser Anwendung
                  deutlich überstiegen hätte. Zudem können wir über eine Web-App
                  für jede Plattform, sowie Endgerät eine Applikation
                  bereitstellen.
                </p>
                <p>
                  Um euch das Gefühl einer „echten“ App zu geben, könnt ihr euch
                  ein Kurzbefehl auf euren Desktop ziehen.
                </p>

                <p>
                  Falls ihr diesen Trick bereits kennt, könnt ihr diesen Schritt
                  überspringen.
                </p>

                <template v-if="d.ios">
                  <strong> Für iOS: </strong>
                  <ol class="list--numbering">
                    <li>
                      Öffnen Sie im Safari die Webseite, die Sie als App nutzen
                      wollen.
                    </li>
                    <li>
                      Klicken Sie in der unteren Menüleiste in der Mitte auf das
                      „Teilen”-Symbol (Viereck mit Pfeil nach oben). Scrollen
                      Sie herunter und wählen Sie „Zum Home-Bildschirm".
                    </li>
                    <li>
                      Nun können Sie „die App" noch benennen. Der Name erscheint
                      unter dem App-Symbol. Das Symbol wird übrigens automatisch
                      generiert bzw. von der Webseite geliefert.
                    </li>
                    <li>
                      Auf „Hinzufügen" klicken. Das iPhone platziert die App nun
                      auf einem freien Platz und man kann sie wie eine beliebige
                      Anwendung verschieben. Klickt man nun auf die Kachel,
                      öffnet sich die Webseite schnell und einfach im Browser –
                      als wäre es eine echte App.
                    </li>
                  </ol>

                  <strong>Quelle:</strong>
                  <a
                    href="https://www.mv-energieportal.de/website-als-app-abspeichern#chrome-android"
                    target="_blank"
                    >Website als App abspeichern</a
                  >
                </template>
                <template v-else-if="d.android">
                  <strong>Chrome:</strong>
                  <ol class="list--numbering">
                    <li>
                      Öffnen Sie in Chrome die Webseite, die Sie als App nutzen
                      wollen.
                    </li>
                    <li>
                      Gehen Sie oben rechts auf die drei Punkte und scrollen Sie
                      zum Menüpunkt „Zum Startbildschirm zufügen". Diesen
                      auswählen.
                    </li>
                    <li>
                      Nun können Sie „die App" noch benennen. Der Name erscheint
                      unter dem App-Symbol. Das Symbol wird übrigens automatisch
                      generiert bzw. von der Webseite geliefert.
                    </li>
                    <li>
                      Klicken Sie auf „Hinzufügen". Das Android-Phone zeigt eine
                      Vorschau. Mit nochmaligem „Hinzufügen" wird die App nun
                      auf einem freien Platz gesetzt. Nun kann sie wie eine
                      beliebige Anwendung verschoben werden. Klicken Sie auf die
                      Kachel, öffnet sich die Webseite schnell und einfach im
                      Browser – als wäre es eine echte App.
                    </li>
                  </ol>

                  <strong>Firefox:</strong>
                  <ol class="list--numbering">
                    <li>
                      Gehen Sie in Firefox oben rechts auf die drei Punkte.
                    </li>
                    <li>Wählen Sie „zum Startbildschirm hinzufügen”.</li>
                    <li>
                      Geben Sie der App einen Namen und gehen Sie auf
                      „Hinzufügen”.
                    </li>
                  </ol>

                  <strong>Quelle:</strong>
                  <a
                    href="https://www.mv-energieportal.de/website-als-app-abspeichern#chrome-android"
                    target="_blank"
                    >Website als App abspeichern</a
                  >
                </template>

                <template v-else>
                  <p>
                    Diese Seite ist irrelevant für die Desktop Anwendung.
                    Speichert euch den Link zur App als Lesezeichen. Sonst seht
                    ihr ebenfalls über euren Verlauf, die letzten besuchten
                    Seiten.
                  </p>
                </template>
              </div>
              <ButtonWrapper>
                <template #buttons>
                  <ButtonType
                    :type-button="true"
                    :btn-text="'Weiter'"
                    :btn-class="'w-100'"
                    @click="handleTutorialTrack('stepThree')"
                  />
                </template>
              </ButtonWrapper>
            </template>
            <template v-else-if="stepThree">
              <h2>Was die Web-App dir bietet</h2>

              <div class="body-text-b2">
                <ul class="list">
                  <li>
                    Der Kassenwart (Philipp) kann eure Bilanz speichern, so
                    könnt ihr auf eurem Profil sehen, wie viel Geld offen ist.
                    (Keine Sorge, nur die Trainer, Philipp und du selbst können
                    die Bilanz einsehen.)
                  </li>
                  <li>
                    Für Absagen gibt es valide Vorschläge, die ihr benutzen
                    könnt, ohne viel zu schreiben. Hier reicht ein einfacher
                    klick.
                  </li>
                  <li>
                    Auf eurem Dashboard werden die nächsten drei Termine, sowie
                    wichtige Termine angezeigt, die von den Trainern so
                    definiert worden sind.
                  </li>
                  <li>
                    Es gibt eine Terminübersichtsseite bei dem alle Termine
                    angezeigt werden. Pro Monat gibt es eine Seite. Ihr könnt zu
                    jedem weiteren Monat navigieren um ggf. bereits Urlaube
                    eintragen zu können.
                  </li>
                  <li>
                    Info bezüglich Datenspeicherung: Wenn ihr kein Teil des Team
                    mehr seid, werden eure Daten vom Server gelöscht. Dafür
                    haben die Trainer die Option.
                  </li>
                  <li>
                    Eure E-Mail Adresse wird nicht explizit benötigt, diese
                    dient nur als Validierung damit ihr euch nicht aus Versehen
                    doppelt registriert. Mit dieser E-Mail wird nichts
                    angestellt, wir benutzen diese nicht oder schicken euch
                    lästige Werbung etc.
                  </li>
                  <li>
                    Thema Passwort vergessen. Bitte vergesst es einfach nicht!
                    Es gibt aktuell keine Option zum zurücksetzen des Passworts.
                    Falls ihr es doch hinbekommen solltet, meldet euch bei mir!
                    (Dennis). Sags aber jetzt schon mal, das ist `n Kasten.
                  </li>
                  <li>
                    Weitere Features werden nach und nach eingebaut. Ein paar
                    sind bereits angeteasert.
                  </li>
                  <li>
                    Falls euch Fehler auffallen, gerne mir Bescheid geben
                    (Dennis). Dann kann ich mich darum kümmern.
                  </li>
                </ul>
              </div>

              <ButtonWrapper>
                <template #buttons>
                  <ButtonType
                    :type-button="true"
                    :btn-text="'Alles klar!'"
                    :btn-class="'w-100'"
                    @click="finishTutorial()"
                  />
                </template>
              </ButtonWrapper>
            </template>
            <template v-else>
              <h2>Einstieg - Alles was ihr erstmal wissen müsst</h2>
              <div class="body-text-b2">
                <p>
                  Moin moin, willkommen zur neuen Web-App <q>SVF Plus</q>. Lass
                  uns bevor du auf die App Oberfläche zugreifst, noch ein paar
                  Dinge durchgehen um dir den Einstieg etwas zu vereinfachen.
                </p>
              </div>
              <ButtonWrapper>
                <template #buttons>
                  <ButtonType
                    :type-button="true"
                    :btn-text="'Alles klar, verstanden'"
                    :btn-class="'w-100'"
                    @click="handleTutorialTrack('stepTwo')"
                  />
                </template>
              </ButtonWrapper>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDevice } from 'next-vue-device-detector';
import { useUser } from '@/composables/useUser.ts';
import { useRouter } from 'vue-router';
import store from '@/store';
import ButtonType from '@/components/ButtonType.vue';
import ButtonWrapper from '@/components/ButtonWrapper.vue';
import { UserData } from '@/interface';

const d = useDevice();
const { getUserByID, selectedUser, setUserFields, updateUserByID } = useUser();
const router = useRouter();

console.log('ios', d.ios);
console.log('android', d.android);

const stepOne = ref(true);
const stepTwo = ref(false);
const stepThree = ref(false);

const handleTutorialTrack = (nextStep: string) => {
  if (nextStep === 'stepTwo') {
    stepOne.value = false;
    stepTwo.value = true;
    stepThree.value = false;
  } else if (nextStep === 'stepThree') {
    stepOne.value = false;
    stepTwo.value = false;
    stepThree.value = true;
  } else {
    stepOne.value = true;
    stepTwo.value = false;
    stepThree.value = false;
  }

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
};

const getSelectedUser = ref<UserData | null>(null);

const finishTutorial = () => {
  const updates = {
    watchedTutorial: true,
    userIsActivated: true,
  };

  setUserFields(getSelectedUser.value, updates);

  if (getSelectedUser.value) {
    updateUserByID(getSelectedUser.value.id, router);
  }
};

onMounted(async () => {
  await getUserByID(store.state.userData.id);

  getSelectedUser.value = selectedUser.value;
});
</script>

<style scoped lang="scss">
.tutorial {
  padding: rem(50px) 0;

  &__step {
    h2,
    .h2 {
      margin-bottom: rem(10px);
    }
  }

  .button-wrapper {
    margin-top: rem(20px);
  }
}
</style>
