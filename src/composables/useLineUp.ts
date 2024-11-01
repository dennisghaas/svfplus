import {ref, computed} from "vue";
import {Positions, UserData} from "@/interface";

const lineUpFormation = ref<Positions[]>([])
const lineUpUser = ref<UserData[]>([]);
const selectedUserData = ref<UserData[]>([])
const selectedUser = computed(() => selectedUserData.value[0] || null);
const selectedPosition = ref<Positions[]>([])
const renderSubPlayers = ref([])
const filteredLineUpFormation = computed(() => {
    return lineUpFormation.value.filter(pos => !pos.isSelected);
});
const filteredLineUpUser = computed(() => {
    return lineUpUser.value.filter(user => !renderSubPlayers.value.includes(user.id))
})

/* view refs */
const viewSelectedPlayer = ref(false)
const viewSwapPlayer = ref(false)
const viewSelectedPosition = ref(false)

export const useLineUp = () => {
    const handleUserSelection = (handler: string) => {
        if (handler === 'viewSelectedPlayer') {
            viewSelectedPlayer.value = true
        } else if(handler === 'viewSelectedPosition') {
            viewSelectedPosition.value = true
        } else if(handler === 'viewSwapPlayer') {
            viewSwapPlayer.value = true
        } else {
            viewSelectedPlayer.value = false
            viewSelectedPosition.value = false
            viewSwapPlayer.value = false
        }
    }

    const lineUpPlayer = (user: UserData[]) => {
        selectedUserData.value = [user];
    }

    const lineUpPlayerSelectedPosition = (pos: Positions[]) => {
        selectedPosition.value = pos
    }

    const saveNewPos = (selectedUser: UserData[], selectedPosition: Object) => {
        const position = lineUpFormation.value.find(pos => pos.id === selectedPosition.id);
        if (position) {
            position.userId = selectedUser.id;
            position.player = `${selectedUser.name} ${selectedUser.surname}`;
            position.isSelected = true

            /* push selected player by id into renderSubPlayers */
            renderSubPlayers.value.push(selectedUser.id);

            /* remove current selected user from ref */
            selectedUserData.value = []
        }
    }

    const saveSwappingPlayers = (selectedUser: UserData[]) => {
        const swappedPlayerId = selectedPosition.value.userId;
        const swappedPlayerPosId = selectedPosition.value.id;

        // Remove the swapped player by ID
        renderSubPlayers.value = renderSubPlayers.value.filter(id => id !== swappedPlayerId);

        // Update lineUpFormation with the new player's details
        const position = lineUpFormation.value.find(pos => pos.id === swappedPlayerPosId);
        if(position) {
            position.userId = selectedUser.id;
            position.player = `${selectedUser.name} ${selectedUser.surname}`;
            position.isSelected = true;

            // Add the new player's ID to renderSubPlayers
            renderSubPlayers.value.push(selectedUser.id);

            // Clear selected user data
            selectedUserData.value = [];
        }
    };

    const removePlayerFromLineUp = (posId: number) => {
        /* get positions array of selected postion */
        const position = lineUpFormation.value.find(pos => pos.id === posId);
        if (position) {
            /* remove dynamic data from selected object */
            const posUserId = position.userId;
            position.isSelected = false
            position.player = ''

            /* remove user from line up */
            renderSubPlayers.value.pop(posUserId)

            /* set back user id in pos object back to null */
            position.userId = null
        }
    }


    return {
        lineUpFormation,
        lineUpUser,
        selectedUser,
        selectedUserData,
        selectedPosition,
        filteredLineUpFormation,
        renderSubPlayers,
        viewSelectedPlayer,
        viewSwapPlayer,
        viewSelectedPosition,
        filteredLineUpUser,
        handleUserSelection,
        lineUpPlayer,
        saveNewPos,
        removePlayerFromLineUp,
        lineUpPlayerSelectedPosition,
        saveSwappingPlayers
    }
}