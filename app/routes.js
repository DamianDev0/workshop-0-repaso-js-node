import { ApiJsonPlaceholder } from "./pages/api_page";
import { GradesPage } from "./pages/grades";
import { PlatziPage } from "./pages/platzi/platzi_page";
import { TaskManager } from "./pages/tasks";




export const routes = {
    public: [
        { path: '/', page: TaskManager},
        { path: '/second-exercise', page: GradesPage},
        { path: '/third-exercise', page: ApiJsonPlaceholder},
        { path: '/fourth-exercise', page: PlatziPage},
    ]
};
