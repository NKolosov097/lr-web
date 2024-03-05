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
import mockData from './test/mock/mockData.json'
import { useEffect, useState } from 'react'
import { Data } from './types/data'

const App = () => {
    const [data, setData] = useState<Data[]>([])

    useEffect(() => {
        document.getElementsByClassName('cesium-viewer-bottom')[0]?.remove()

        setData(mockData.data)
        console.log(data)
    }, [data])

    return (
        <Viewer
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
                    <CameraFlyTo
                        duration={5}
                        destination={Cartesian3.fromDegrees(
                            info.latitude,
                            info.longitude,
                            info.altitude ?? 20000
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
                        <h2>
                            Давно выяснено, что при оценке дизайна и композиции
                            читаемый текст мешает сосредоточиться. Lorem Ipsum
                            используют потому, что тот обеспечивает более или
                            менее стандартное заполнение шаблона, а также
                            реальное распределение букв и пробелов в абзацах,
                            которое не получается при простой дубликации Здесь
                            ваш текст.. Здесь ваш текст.. Здесь ваш текст.
                        </h2>
                    </EntityDescription>
                </Entity>
            ))}
        </Viewer>
    )
}

export default App
