import styles from '@/app/login/login.module.css'
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from 'next/link';
export default function Login() {
  return (
    <>
    <div className={styles.container}>
      <Card>
        <form >

          <h1 className={styles.title}>Login Colaborador</h1>
          <div className={styles.containerInput}>
          <Input
              label='CPF'
              placeholder="Digite apenas números"
              required
              inputMode="numeric"
              maxLength={11}
            />
            <Input
              label='Senha'
              type="password"
              placeholder='**********'
              required
            />
            </div>
            
            <Link  className={styles.button} href={'/aeronaves'} >
            
            <Button >Entrar</Button>
            
            </Link>
            
            
          
        </form>

      </Card>

    </div>
    </>
  )
}