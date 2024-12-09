import AccountData from '../features/user/AccountData';

function PersonalSettings() {
  return (
    <section className='pt-5'>
      <div className='border-b-[1px] border-lightGrey p-5'>
        <h1 className=' text-xl font-bold mb-2'>Ajustes personales</h1>
        <p>Administra tus datos y preferencias.</p>
      </div>

      <AccountData />
    </section>
  );
}

export default PersonalSettings;
