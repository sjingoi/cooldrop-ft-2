<script lang="ts">

    import InfoPanel from "./InfoPanel.svelte";
    import PeersArea from "./PeersArea.svelte";
    import { v4 as uuidv4 } from 'uuid';

    import { ServerConnection } from "../serverconnection";
    import { type ServerMessage, MessageType } from "../serverconnection";
    import { onMount } from "svelte";

    let uuid: string;
    let public_uuid: string | null;
    let name: string | null;
    
    onMount(() => {

        name = localStorage.getItem("name");
        uuid = localStorage.getItem("uuid") || "";
        
        if (uuid === "") {
            uuid = uuidv4();
            localStorage.setItem("uuid", uuid);
        }

        const serverconnection: ServerConnection = new ServerConnection("localhost:8080");

        serverconnection.addMessageListener(MessageType.PUBLIC_UUID, (data) => {
            public_uuid = data;
        })

        serverconnection.addMessageListener(MessageType.PRIVATE_UUID_REQ, (data) => {
            console.log("Sending UUID");
            serverconnection.send(MessageType.PRIVATE_UUID, uuid);
        })

        // serverconnection.socket?.addEventListener("open", (event) => {
        //     let uuid_message: ServerMessage = {
        //         type: MessageType.PRIVATE_UUID,
        //         data: uuid,
        //     }
        //     serverconnection.send(uuid_message);
        // })

    })

</script>
<InfoPanel name={name} public_uuid={public_uuid}/>
<PeersArea />