import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../page_header";
import '../../assets/scss/video_page.scss'
import EventSystem from "../../utility/EventSystem";
import { MQTTServer } from "../../mqtt/mqtt_server";
import { MQTTFrontModeOut } from "../../data/static_share_varaible";

export const EducationVideoPage = function({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {
    let [searchParams, setSearchParams] = useSearchParams();
    let video_name = searchParams.get('name');

    if (video_name == null) video_name = "教學影片";

    return (
        <div id="video_page">
            <PageHeader title={video_name}></PageHeader>

            <div className="video_content">
                <iframe src="https://player.vimeo.com/video/941599033?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" title="test_video_source"></iframe>
            
                <script src="https://player.vimeo.com/api/player.js"></script>


                <div className="video_actions">
                    <button className='button' onClick={() => {
                        mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Idle);
                    }}>Back to default setting</button>

                    <button className='button' onClick={() => {
                        mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Left_MCU_Read_Action);
                        }}>Turn left</button>

                    <button className='button' onClick={() => {
                        mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Right_MCU_Read_Action);
                        }}>Turn right</button>
                </div>
            </div>
        </div>
    )
}