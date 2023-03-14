export function SystemInfoCard(props: { attr: string; value: string }) {
  return (
    <div className='flex align-middle justify-between'>
      <div className='text-gray-700 dark:text-gray-400'>{props.attr}</div>
      <div className='font-bold tracking-tight text-gray-900 dark:text-white'>{props.value}</div>
    </div>
  );
}
