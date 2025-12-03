import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import type { CreateUserDto } from '../types/user';

const registerUser = async (data: CreateUserDto) => {
    const response = await api.post('/user/register', data);
    return response.data;
};

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
    });
};