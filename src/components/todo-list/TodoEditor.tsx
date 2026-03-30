import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateTodoMutation } from '@/hooks/mutations/use-create-todo-mutation';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface InputForm {
  content: string;
}

export default function TodoEditor() {
  const { mutate, isPending, isError } = useCreateTodoMutation();

  const { register, handleSubmit, resetField } = useForm<InputForm>();
  const onSave: SubmitHandler<InputForm> = (data) => {
    mutate(data.content);
    resetField('content');
  };

  // 비동기 로딩상태
  if (isPending) <div>isPending...</div>;
  if (isError) <div>is Error!!...</div>;
  return (
    <form onSubmit={handleSubmit(onSave)} className="flex gap-2">
      <Input
        {...register('content')}
        placeholder="새로운 할 일을 입력해주세요!"
      />
      <Button disabled={isPending} type="submit">
        추가
      </Button>
    </form>
  );
}
