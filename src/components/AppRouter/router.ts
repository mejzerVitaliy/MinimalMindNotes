import SignInForm from "../Pages/Registration/SignInForm"
import LogInForm from "../Pages/Login/LogInForm"
import Account from "../Pages/Account/Account"
import Notes from "../Pages/GeneralPage/GeneralPage"
import CreateNote from "../Pages/CreateNewNote/CreateNote"
import AboutPage from "../Pages/About/AboutPage"
import Note from "../Pages/GeneralPage/Note/Note"

interface Routes {
    path: string,
    element: React.FC
}

export const publicRoutes: Routes[] = [
    { path: '/signIn', element: SignInForm  },
    { path: '/logIn', element: LogInForm }
]

export const privateRoutes: Routes[] = [
    { path: '/account', element: Account },
    { path: '/myNotes', element: Notes },
    { path: '/note/:noteID', element: Note},
    { path: '/createNote', element: CreateNote },
    { path: '/aboutMinimalMind', element: AboutPage }
]