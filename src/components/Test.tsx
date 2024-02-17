import {
    Viewer as CesiumViewer,
    IonResource,
    IonImageryProvider,
    ArcGisMapServerImageryProvider,
} from 'cesium'
import { useRef } from 'react'
import {
    Cesium3DTileset,
    CesiumComponentRef,
    ImageryLayer,
    Viewer,
} from 'resium'

export default {
    title: 'Cesium3DTileset',
    component: Cesium3DTileset,
}

export const Basic = (args) => {
    const ref = useRef<CesiumComponentRef<CesiumViewer>>(null)
    return (
        <Viewer full ref={ref}>
            <ImageryLayer
                {...args}
                imageryProvider={ArcGisMapServerImageryProvider.fromUrl(
                    'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
                )}
            />
            <Cesium3DTileset
                {...args}
                url="./tileset/tileset.json"
                onTileLoad={() => console.log('loaded')}
                onReady={(tileset) => {
                    ref.current?.cesiumElement?.zoomTo(tileset)
                }}
            />
        </Viewer>
    )
}

export const Resource = (args) => {
    const ref = useRef<CesiumComponentRef<CesiumViewer>>(null)
    return (
        <Viewer full ref={ref}>
            <Cesium3DTileset {...args} url={IonResource.fromAssetId(96188)} />
        </Viewer>
    )
}

export const BasicImageryLayer = (args) => (
    <Viewer full>
        <ImageryLayer
            {...args}
            imageryProvider={ArcGisMapServerImageryProvider.fromUrl(
                'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
            )}
        />
        <ImageryLayer
            alpha={0.5}
            imageryProvider={IonImageryProvider.fromAssetId(3812, {})}
        />
    </Viewer>
)
