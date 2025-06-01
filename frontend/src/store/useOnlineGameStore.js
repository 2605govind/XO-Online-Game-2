import { create } from 'zustand'
import socket from '../utils/socket';
import axiosClient from '../utils/axiosClient';
import { navigate } from '../hook/useNavigate';

export const useOnlineGameStore = create((set, get) => ({
    userSoketId: null,
    userName: 'player',

    opponentSocketId: null,
    opponentName: '',

    connectionLoading: false,
    connectionURL: '',

    gameStart: false,

    playerWaiting: false, 


    socketHandleOpponentRespons: (data) => {
        // already game running
        if (get().opponentSocketId) {
            return;
        }

        //  {opponentName, opponentId});
        set({ opponentSocketId: data.opponentId, opponentName: data.opponentName });
        set({ gameStart: true });
    },

    makePlayGround: async () => {
        try {
            set({ connectionLoading: true });

            if (!socket.connected) {
                socket.connect();
            }

            await new Promise((resolve) => {
                const handleConnect = () => {
                    socket.off('connect', handleConnect);
                    resolve();
                }
                if (socket.connected) {
                    // already connected
                    resolve();
                } else {
                    socket.once('connect', handleConnect); // wait for connect

                }
            });

   
            set({ userSoketId: socket.id });

            socket.on('playground-reset', (gameSrt) => {
                navigate('/');
                get().gameValueReset();
            })


        } catch (error) {
            console.log("error at makeplayground ", error);
        }
    },

    destroyPlayGround: async () => {
        try {
            await new Promise((resolve) => {
                if (socket.connected) {

                    if(get().opponentSocketId){
                        socket.emit('playground-disconnected', {opponentId: get().opponentSocketId});
                    }

                    get().gameValueReset(); // reset all value

                    socket.disconnect();
                    resolve();
                } else {
                    resolve();
                }
            });
            // console.log('disconnect')

            // send to opponent for disconnected
            socket.off('playground-reset', (gameSrt) => {
                navigate('/');
                get().gameValueReset();
            })


        } catch (error) {
            console.log("error at destroyPlayGround, ", error);
        }

    },

    getConnectionWithOpponentURL: () => {
        const { userSoketId, userName } = get();

        const currentModuleURL = new URL(import.meta.url);
        // console.log(currentModuleURL.origin); // e.g., "http://localhost:5173"
        
        const url = `${currentModuleURL.origin}/useronlineground/${userSoketId}/${userName}`
        set({ connectionURL: url });
    },

    hundleName: (e,name) => {
        e.preventDefault();

        if(name == '') return;

        if(name.length > 16) {
            alert('Please Enter Small Name')
            return;
        }

        set({userName: name, connectionLoading: false})
    },
    

    gameValueReset: () => {
        set({ userSoketId: null, userName: 'player', connectionURL: '', opponentSocketId: null, opponentName: '', connectionLoading: false, gameStart: false });
    },

    // opponent function
    userConnectToCreater: async (id, name) => {
        try {
            const message = {
                userId: get().userSoketId,
                userName: get().userName,
                createrId: id,
            }

            set({ opponentSocketId: id, opponentName: name });

            // gameStart
            const res = await axiosClient.post('/connect/connecttocreter', message);

            set({ gameStart: res.data.gameStart });

        } catch (error) {
            console.log("error at userConnectToCreater, ", error);
        }
    },
}))