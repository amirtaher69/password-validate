import {useState } from 'react';
import { Formik , Form , Field , ErrorMessage} from 'formik';
import * as Yup from 'yup';

import styles from "./../styles/components/register.module.css"
import passwodValidate from '../functions/passValidate';

const SignupSchema = Yup.object().shape({
    password: Yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/ ,'not staright').min(8),
    repeatPassword: Yup.string()
    .test('passwords-match', 'Password and confirm password does not match', function(value){
      return this.parent.password === value
    })
});

export default function Register(){
    
    /*--------------------------------------------
    -   state
    --------------------------------------------*/
    const [passErrors, setPassErrors] = useState([]);

    /*---------------------------------------------
    -   functions
    ---------------------------------------------*/
    const validator = async e => {
        e.preventDefault();
        const password = e.target.value;
        const result = await passwodValidate(password);
        setPassErrors(result.errors ? Object.values(result.errors) : []);
    };
    return(
        <Formik
            initialValues={{  password: '' ,repeatPassword: '' }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
            >
            {({
                isSubmitting,
                isValid,
                dirty,
                errors,
                touched,values
            }) => (
                <Form className={styles.formBox}>
                    <div className={styles.fieldWrap}>
                        <label >password</label>
                        <Field type="password" name="password" onKeyUp ={validator} className={`${(errors.password && touched.password)?styles.errorFormField:""}`}/>
                    </div>
                    <div className={styles.fieldWrap}>
                        <label >confirm passwor</label>
                        <Field type="password" name="repeatPassword" className={`${(errors.repeatPassword && touched.repeatPassword)?styles.errorFormField:""}`}/>
                    </div>
                    <ul className={styles.errorList}>
                        {passErrors.length ? (
                            passErrors.map(error => (
                                <li className={styles.errorMessage} key={error}>{error}</li>
                            ))
                        ) : null}
                        <li className={styles.errorMessage}>
                            <ErrorMessage name="repeatPassword" component="div" />
                        </li>
                    </ul>
                    
                    <button type="submit" disabled={!isValid ||!dirty || isSubmitting}>signin</button>
                </Form>
            )}
        </Formik>
    )
}