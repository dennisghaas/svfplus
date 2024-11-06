import {ref, computed, onMounted} from "vue";
import {EventResponse, Positions, UserData} from "@/interface";

const lineUpFormation = ref<Positions[]>([])
const lineUpUser = ref<UserData[]>([]);
const selectedUserData = ref<UserData | null>(null);
const selectedUser = computed(() => selectedUserData.value || null);
const selectedPosition = ref<Positions | null>(null);
const renderSubPlayers = ref<number[]>([]);
const filteredLineUpFormation = computed(() => {
    return lineUpFormation.value
        .filter(pos => !pos.isSelected)
        .map(pos => ({
            pos: pos.pos,
            name: pos.name
        }));
});
const filteredLineUpUser = computed(() => {
    return lineUpUser.value.filter(user => !renderSubPlayers.value.includes(user.id));
})
const showControls = ref<boolean[]>([]);
const eventResponses = ref(<EventResponse[]>([]))

/* view refs */
const viewSelectedPlayer = ref(false)
const viewSwapPlayer = ref(false)
const viewSelectedPosition = ref(false)

export const useLineUp = () => {
    const handleUserSelection = (handler?: string) => {
        if (handler === 'viewSelectedPlayer') {
            viewSelectedPlayer.value = true
        } else if (handler === 'viewSelectedPosition') {
            viewSelectedPosition.value = true
        } else if (handler === 'viewSwapPlayer') {
            viewSwapPlayer.value = true
        } else {
            viewSelectedPlayer.value = false
            viewSelectedPosition.value = false
            viewSwapPlayer.value = false
        }
    }

    const handleShowControls = (index: number) => {
        showControls.value = showControls.value.map((_, i) => i === index);
    };

    const lineUpPlayer = (user: UserData) => {
        selectedUserData.value = user;
    }

    const lineUpPlayerSelectedPosition = (pos: Positions) => {
        selectedPosition.value = pos
    }

    const pushIntoPosition = (position: any, selectedUser: UserData) => {
        position.userId = selectedUser.id;
        position.player = `${selectedUser.name} ${selectedUser.surname}`;
        position.isSelected = true;
        position.user = selectedUser;

        // Add the selected player's ID to renderSubPlayers
        renderSubPlayers.value.push(selectedUser.id);

        // Clear selected user data
        selectedUserData.value = null;
    };

    const saveNewPos = (selectedUser: UserData, selectedPosition: Positions | null | undefined) => {
        if (selectedPosition) {
            const position = lineUpFormation.value.find(pos => pos.id === selectedPosition.id);
            if (position) {
                pushIntoPosition(position, selectedUser);
            }
        }
    };

    const saveSwappingPlayers = (selectedUser: UserData) => {
        if(selectedPosition.value) {
            const swappedPlayerId = selectedPosition.value.userId;
            const swappedPlayerPosId = selectedPosition.value.id;

            // Remove the swapped player by ID from renderSubPlayers
            renderSubPlayers.value = renderSubPlayers.value.filter(id => id !== swappedPlayerId);

            const position = lineUpFormation.value.find(pos => pos.id === swappedPlayerPosId);
            if (position) {
                pushIntoPosition(position, selectedUser);
            }
        }
    };

    const removePlayerFromLineUp = (posId: number | null) => {
        /* get positions array of selected postion */
        const position = lineUpFormation.value.find(pos => pos.id === posId);
        if (position) {
            /* remove dynamic data from selected object */
            const posUserId = position.userId;
            position.isSelected = false
            position.player = ''
            position.user = null

            /* remove user from line up */
            renderSubPlayers.value = renderSubPlayers.value.filter(id => id !== posUserId);

            /* set back user id in pos object back to null */
            position.userId = null

            /* hide controls */
            showControls.value = showControls.value.map(() => false);
        }
    }

    onMounted(() => {
        showControls.value = Array(lineUpFormation.value.length).fill(false);
    })

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
        showControls,
        eventResponses,
        handleUserSelection,
        lineUpPlayer,
        saveNewPos,
        removePlayerFromLineUp,
        lineUpPlayerSelectedPosition,
        saveSwappingPlayers,
        handleShowControls
    }
}