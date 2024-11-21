/* just for admin rights to fix current display */
import {fetchDataFromApi} from '@/helpers/fetchDataFromApi.ts';
import {combineDateAndTime} from "@/helpers/combineDateAndTime.ts";
import {Event} from '@/interface';
import {extractDateAndTime} from "@/helpers/extractDateAndTime.ts";

export const useChangeDeadlineToStart = () => {
    const changeDeadlineToStartForTraining = async () => {
        const response = await fetchDataFromApi('/events', 'GET');

        if (response && Array.isArray(response)) {
            const events: Event[] = response as Event[];
            const filteredEvents = events.filter(
                (event) => event.eventType === 'Training'
            );

            try {
                for (const training of filteredEvents) {
                    if (training.eventDate && training.eventDescription.deadlineToStart) {
                        const getDate = extractDateAndTime(training.eventDate).day;
                        const date = new Date(getDate);
                        date.setDate(date.getDate() - 1);
                        const newDeadlineToStart = combineDateAndTime(date, training.eventDescription.beginAt);

                        const response = await fetchDataFromApi(`/events/${training.id}`, 'PUT', {
                              author: training.author,
                              eventDescription: {
                                  endAt: training.eventDescription.endAt,
                                  title: training.eventDescription.title,
                                  meetAt: training.eventDescription.meetAt,
                                  beginAt: training.eventDescription.beginAt,
                                  subtitle: training.eventDescription.subtitle,
                                  description: training.eventDescription.description,
                                  deadlineToStart: newDeadlineToStart,
                              },
                              eventType: training.eventType,
                              eventDate: training.eventDate,
                              venue: training.venue,
                              venueStreet: training.venueStreet,
                              venuePostalCode: training.venuePostalCode,
                              standingOrderID: training.standingOrderID,
                              showInDashboard: training.showInDashboard,
                              linkExtern: training.linkExtern,
                              playerWithNoAccess: training.playerWithNoAccess,
                              voteQuestion: training.voteQuestion,
                              voteOptions: [
                                  {
                                      text: "",
                                      index: 0,
                                  },
                                  {
                                      text: "",
                                      index: 1,
                                  },
                              ],
                              voteMultipleSelection: training.voteMultipleSelection,
                          });

                          console.log('Trainingstage erfolgreich angepasst', response);
                    } else {
                        console.log('Kein Event Date vorhanden');
                    }
                }
            } catch (error) {
                console.error('Fehler beim Bearbeiten der Trainingstage', error);
            }
        } else {
            console.error('Die Antwort ist entweder leer oder kein Array:', response);
        }
    };

    return {
        changeDeadlineToStartForTraining,
    };
};
