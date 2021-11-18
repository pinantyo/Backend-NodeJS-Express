import { useHistory } from 'react-router-dom';

export default function withRouter(Component){
  const Wrapper = (props) => {
    const history = useHistory();
    
    return (
      <Component
        history={history}
        {...props}
        />
    );
  };
  
  return Wrapper;
};