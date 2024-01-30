import NoSession from '../../components/NoSession/NoSession';
import style from './createDog.module.scss'


export const CreateDog = () => {
  

  
  return (
    <div className={style.createDog}>
      <NoSession path={'create-dog'}/>
    </div>
  )
}
export default CreateDog;