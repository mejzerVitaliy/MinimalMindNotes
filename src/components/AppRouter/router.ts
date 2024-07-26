import SignInForm from "../Pages/Registration/SignInForm"
import LogInForm from "../Pages/Login/LogInForm"
import Account from "../Pages/Account/Account"

interface Routes {
    path: string,
    element: React.FC
}

export const publicRoutes: Routes[] = [
    { path: '/signIn', element: SignInForm  },
    { path: '/logIn', element: LogInForm }
]

export const privateRoutes: Routes[] = [
    {path: '/account', element: Account}
]