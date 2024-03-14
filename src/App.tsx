import Cesium, {
    ArcGisMapServerImageryProvider,
    Cartesian2,
    Cartesian3,
    Color,
    EntityCollection,
    GoogleMaps,
    HorizontalOrigin,
    NearFarScalar,
    Request,
    RequestType,
    ScreenSpaceEventType,
    Transforms,
    createGooglePhotorealistic3DTileset,
} from 'cesium'
import {
    Viewer,
    Entity,
    BillboardGraphics,
    EntityDescription,
    CameraFlyTo,
    ImageryLayer,
    Cesium3DTileset,
    Scene,
    ScreenSpaceEventHandler,
    ScreenSpaceEvent,
    PolylineCollection,
    Polyline,
    PolylineGraphics,
    LabelGraphics,
    LabelCollection,
} from 'resium'
import mockData from './test/mock/mockData.json'
import { useEffect, useState } from 'react'
import { Polyline as PolylineType } from './types/data'
import { CanvasEntity } from './components/Canvas'

const App = () => {
    const [data, setData] = useState<PolylineType[]>([])
    const [positions, setPositions] = useState<Cartesian3[]>([
        new Cartesian3(-75, 35, 0),
        new Cartesian3(-125, 35, 0),
        new Cartesian3(-125, 135, 0),
    ])

    useEffect(() => {
        setData(mockData.data)

        async function addGoogleP3T() {
            try {
                const tileset = await createGooglePhotorealistic3DTileset()
                // scene.primitives.add(tileset)
            } catch (error) {
                console.log(
                    `Ошибка загрузки Google Photorealistic 3DTileset. ${error}`
                )
            }
        }

        addGoogleP3T()
    }, [data])

    // Добавление фотореалистичной 3D Tiles (карты). Для этого нужно GoogleMaps.defaultApiKey
    GoogleMaps.defaultApiKey = ''
    const tileset = () => <Cesium3DTileset url="" />

    const onAddPosition = (x: number, y: number) => {
        setPositions((prevPositions) => [
            ...prevPositions,
            new Cartesian3(x * 20, y * 20, 0),
        ])
        console.log(positions)
    }

    const center = Cartesian3.fromDegrees(-75.59777, 40.03883)

    return (
        <Viewer
            // Пытаюсь заменить глобус Cesium на глобус google
            // sceneMode={scene}
            // Отвечает за отображение звезд
            skyBox={false}
            fullscreenButton={false}
            homeButton={false}
            vrButton={false}
            baseLayerPicker={false}
            navigationHelpButton={false}
            sceneModePicker={false}
            geocoder={false}
            // globe={false} если поставить в false, то пропадет вся Земля
            // infoBox={false} Если поставить в false, то почему-то будет падать в ошибкой. Только мое предположение, что из-за отсутствия access токена
            selectionIndicator={false}
            timeline={false}
            projectionPicker={false}
            // Убирает отображение нижнего левого круглого календаря/циферблата (не знаю как называть)
            animation={false}
            clockViewModel={undefined}
            imageryProviderViewModels={undefined}
            // maximumRenderTimeChange={Infinity}
            requestRenderMode
            full
            useBrowserRecommendedResolution
        >
            <ScreenSpaceEventHandler>
                <ScreenSpaceEvent
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    action={(e) => onAddPosition(e.position.x, e.position.y)}
                    type={ScreenSpaceEventType.RIGHT_CLICK}
                />

                <PolylineCollection
                    modelMatrix={Transforms.eastNorthUpToFixedFrame(center)}
                >
                    <Polyline positions={positions} />
                </PolylineCollection>

                <LabelCollection>
                    <Entity>
                        <PolylineGraphics
                            material={Color.WHITE}
                            positions={positions}
                        />
                    </Entity>
                    {positions.map((p, i) => (
                        <Entity key={i} position={p}>
                            <LabelGraphics text={i.toString()} />
                        </Entity>
                    ))}
                </LabelCollection>

                <CanvasEntity
                    name="Canvas title"
                    description="Canvas description"
                    position={Cartesian3.fromDegrees(
                        74.0707383,
                        40.7117244,
                        100
                    )}
                />

                <ImageryLayer
                    imageryProvider={ArcGisMapServerImageryProvider.fromUrl(
                        'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
                    )}
                />

                {data.map((info) => (
                    <Entity
                        key={info.timeStamp}
                        name="Какой-то заголовок к описанию фото"
                        position={Cartesian3.fromDegrees(
                            info.latitude,
                            info.longitude
                        )}
                    >
                        {/* <CameraFlyTo
                            duration={5}
                            destination={Cartesian3.fromDegrees(
                                info.latitude,
                                info.longitude,
                                info.altitude ?? 20000
                            )}
                        /> */}

                        {/* Background фото */}
                        <BillboardGraphics
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            image="media/bear.jpg"
                            width={100}
                            height={100}
                            scale={1.0}
                            eyeOffset={Cartesian3.ZERO}
                            horizontalOrigin={HorizontalOrigin.CENTER}
                            // verticalOrigin={VerticalOrigin.BOTTOM}
                            color={Color.WHITE}
                            alignedAxis={Cartesian3.ZERO}
                            scaleByDistance={
                                new NearFarScalar(1.5e2, 1.0, 1.5e7, 0.5)
                            }
                        />
                        {/* Добавление тегов */}
                        <Entity
                            position={Cartesian3.fromDegrees(
                                info.latitude,
                                info.longitude
                            )}
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
                            <div>
                                Давно выяснено, что при оценке дизайна и
                                композиции читаемый текст мешает
                                сосредоточиться. Lorem Ipsum используют потому,
                                что тот обеспечивает более или менее стандартное
                                заполнение шаблона, а также реальное
                                распределение букв и пробелов в абзацах, которое
                                не получается при простой дубликации Здесь ваш
                                текст.. Здесь ваш текст.. Здесь ваш текст.
                            </div>
                        </EntityDescription>
                    </Entity>
                ))}
            </ScreenSpaceEventHandler>
        </Viewer>
    )
}

export default App
