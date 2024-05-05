import { Icon } from "leaflet"

export const Mark = (props = {} as any) => {
    const customIcon = new Icon({
        iconUrl: require("../../assets/icons/marker-icon.png"),
        iconSize: [38, 38],
        ...props,
    })
    return customIcon
}
