import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Header from "@/components/Header"


const loading = require("@/assets/lottiefiles/loading.json")
type Props = {}

const Loader = (props: Props) => {
    return <div className="w-screen h-screen flex items-center justify-center ">
        <Header />
        <Player
            autoplay
            loop
            src={loading}
            style={{ width: 300, height: 300 }}
        >
            <Controls visible={false} />
        </Player>
    </div>
}

export default Loader