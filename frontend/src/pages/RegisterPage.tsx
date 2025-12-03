import { useForm } from 'react-hook-form';
import { useRegister } from '../hooks/useRegister';
import type { CreateUserDto } from '../types/user';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUserDto>();
    const { mutate, isPending } = useRegister();

    const onSubmit = (data: CreateUserDto) => {
        mutate(data, {
            onSuccess: (res) => {
                // Phản hồi thành công từ backend
                toast.success(res.message || "Sign up succeess!");
                reset(); // Xóa form
            },
            onError: (err: unknown) => {
                // Phản hồi lỗi từ backend
                const errorMessage = (err as AxiosError<{ message?: string | string[] }>).response?.data?.message;
                if (Array.isArray(errorMessage)) {
                    // Xử lý khi NestJS trả về nhiều lỗi validation
                    errorMessage.forEach(msg => toast.error(msg));
                } else {
                    // Xử lý lỗi ConflictException (Email đã tồn tại) hoặc lỗi khác
                    toast.error(errorMessage || "Many error dunno.");
                }
            },
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl mt-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
                Create an Account
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
                            required: 'Email là bắt buộc',
                            pattern: { value: /^\S+@\S+$/i, message: 'Email không hợp lệ' }
                        })}
                        disabled={isPending}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-100`}
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
                        disabled={isPending}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-100`}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150"
                >
                    {isPending ? 'Registing...' : 'Done signed up'}
                </button>
                <p className="text-center text-sm text-gray-600">
                    Already had an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;