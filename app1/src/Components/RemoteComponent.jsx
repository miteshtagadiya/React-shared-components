import { createRemoteComponent } from "@paciolan/remote-component/dist/lib/createRemoteComponent";
import { createRequires } from "@paciolan/remote-component/dist/lib/createRequires";
import { resolve } from "./remote-component.config.js";

const requires = createRequires(resolve);
export const RemoteComponent = createRemoteComponent({ requires });
