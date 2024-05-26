import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { Provider } from "react-redux"
import { store } from "./redux/rootReducer"
import { FileProvider } from "./context/FileContext"
import { ConfigProvider } from "antd"
import ru_RU from "antd/lib/locale/ru_RU"
import "dayjs/locale/ru"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import * as serviceWorker from "./serviceWorker"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <ConfigProvider locale={ru_RU}>
        <Provider store={store}>
            <FileProvider>
                <App />
            </FileProvider>
        </Provider>
    </ConfigProvider>
)

// serviceWorker.register()
