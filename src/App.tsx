import {
    ArcGisMapServerImageryProvider,
    Cartesian3,
    Color,
    HorizontalOrigin,
    NearFarScalar,
} from 'cesium'
import {
    Viewer,
    Entity,
    BillboardGraphics,
    EntityDescription,
    CameraFlyTo,
    ImageryLayer,
} from 'resium'
import data from './mock.json'

const App = () => {
    console.log(data)

    return (
        <Viewer
            animation
            homeButton
            vrButton
            full
            useBrowserRecommendedResolution
        >
            <ImageryLayer
                // {...args}
                imageryProvider={ArcGisMapServerImageryProvider.fromUrl(
                    'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
                )}
            />
            <Entity
                name="Какой-то заголовок к описанию фото"
                position={Cartesian3.fromDegrees(55.1641667, 37.9522222)}
            >
                <CameraFlyTo
                    duration={5}
                    destination={Cartesian3.fromDegrees(
                        55.1641667,
                        37.9522222,
                        20000
                    )}
                />
                {/* Background фото */}
                <BillboardGraphics
                    image="media/bear.jpg"
                    width={100}
                    height={100}
                    scale={1.0}
                    eyeOffset={Cartesian3.ZERO}
                    horizontalOrigin={HorizontalOrigin.CENTER}
                    // verticalOrigin={VerticalOrigin.BOTTOM}
                    color={Color.WHITE}
                    alignedAxis={Cartesian3.ZERO}
                    scaleByDistance={new NearFarScalar(1.5e2, 1.0, 1.5e7, 0.5)}
                />
                {/* Добавление тегов */}
                <Entity
                    position={Cartesian3.fromDegrees(55.1641667, 37.9522222)}
                    label={{
                        text: 'Bear',
                        font: '20px sans-serif',
                        fillColor: Color.WHITE,
                        outlineColor: Color.TRANSPARENT,
                        style: 2,
                        outlineWidth: 50,
                        pixelOffset: new Cartesian3(0, -70, 0), // смещение label по вертикали
                        showBackground: true,
                        backgroundColor: new Color(0, 0, 0, 0),
                    }}
                />
                <EntityDescription>
                    <h2>
                        Давно выяснено, что при оценке дизайна и композиции
                        читаемый текст мешает сосредоточиться. Lorem Ipsum
                        используют потому, что тот обеспечивает более или менее
                        стандартное заполнение шаблона, а также реальное
                        распределение букв и пробелов в абзацах, которое не
                        получается при простой дубликации Здесь ваш текст..
                        Здесь ваш текст.. Здесь ваш текст.
                    </h2>
                </EntityDescription>
            </Entity>
        </Viewer>
    )
}

export default App
