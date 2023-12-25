/* eslint-disable react/no-unknown-property */
import Iframe from 'react-iframe'
const Biblia = () => {


    return (
        <div >
            <Iframe url="https://www.bibliaenlinea.org/"
                width="100%"
                height="1000px"
                id=""
                className=""
                display="block"
                position="relative" />
        </div>



    )
}

export default Biblia

  // async function updateProfile(event, avatarUrl) {
  //   event.preventDefault();

  //   setLoading(true);
  //   // eslint-disable-next-line no-unused-vars
  //   const { user } = session;

  //   const updates = {
  //     username,
  //     website,
  //     avatar_url,
  //     updated_at: new Date(),
  //   };

  //   const { error } = await supabase
  //     .from('profiles')
  //     .upsert(updates, { returning: 'minimal' }) // Agregué { returning: 'minimal' } para obtener menos información en la respuesta

  //   if (error) {
  //     alert(error.message);
  //   } else {
  //     setAvatarUrl(avatarUrl);
  //   }
  //   setLoading(false);
  // }