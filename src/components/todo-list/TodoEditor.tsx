import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodosActions } from '@/store/todosStore';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface InputForm {
  content: string;
}

export default function TodoEditor() {
  const { register, handleSubmit, resetField } = useForm<InputForm>();
  const { createTodo } = useTodosActions();
  const onSave: SubmitHandler<InputForm> = (data) => {
    createTodo(data.content);
    resetField('content');
  };
  return (
    <form onSubmit={handleSubmit(onSave)} className="flex gap-2">
      <Input
        {...register('content')}
        placeholder="새로운 할 일을 입력해주세요!"
      />
      <Button type="submit">추가</Button>
    </form>
  );
}
