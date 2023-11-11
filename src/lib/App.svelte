<script lang="ts">

    import InfoPanel from "./InfoPanel.svelte";
    import PeersArea from "./PeersArea.svelte";

    import ServerConnection from "../serverconnection"
    import { onMount } from "svelte";

    let name: string = "Seb";
    let uuid: string = "1";

    onMount(() => {
        const serverconnection: ServerConnection = new ServerConnection("cooldrop.cc");
        serverconnection.addMessageListener("text", (data) => console.log(data) );
    })
    
    


</script>
<InfoPanel />
<PeersArea />