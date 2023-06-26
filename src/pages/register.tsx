import { UserRegister } from '@/components'
import { MainNoFooter } from '@/templates'

export type RegisterTabOption = 'user' | 'store'

const Register = () => {


  return (
    <MainNoFooter title={'Đăng ký'} description="">
      <div className="container min-h-[80vh] w-[90%] md:w-[50%] mx-auto">
        <div className="bg-white p-12 rounded-lg shadow-shadow-1 my-32">

          <p className="text-center text-text-color text-xl capitalize font-bold my-24">{`Đăng ký người dùng`}</p>

          <UserRegister className="w-[90%] lg:w-[50%] mx-auto" />
        </div>
      </div>
    </MainNoFooter>
  )
}

export default Register
