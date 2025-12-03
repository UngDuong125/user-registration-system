import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = () => {
        toast.success("Login successed!");
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Email no empty',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid Email' }
                        })}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', {
                            required: 'Password no empty',
                            minLength: { value: 6, message: 'Password length >= 6' }
                        })}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;