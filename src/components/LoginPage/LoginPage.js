import React from 'react';
import {Card,Container,Title,InputBox,LoginButton} from './styles'
import {FormGroup,Form} from 'reactstrap'

function LoginPage() {
  return (

    <Container>
      <Card>
        <Title>HEY DUDE !</Title>
        <Form>
          <FormGroup>
              <InputBox type="text" name="nickname" id="nickname" placeholder="Enter Your Nickname"  />
          </FormGroup>
          <LoginButton  type="submit">
              Login
          </LoginButton>
        </Form>
      </Card>
    </Container>
  )
}

export default LoginPage;
