import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { validateEmailFormat } from '@utils/Utils';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Countdown from 'react-countdown';
import useStore from '@src/hooks/useStore';
import axios from 'axios';
import ReSettingPw from './ReSettingPw';

const ReSettingPwVerify = () => {
  const { AuthStore } = useStore();

  const [isEmailFormatValid, setEmailFormatValid] = useState<boolean>(false);
  const [hasEmailUser, setHasEmailUser] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [remainTime, setRemainTime] = useState<number>(0);
  const [mode, setMode] = useState<boolean>(false);
  const [authErrMsg, setAuthErrMsg] = useState<string>('');

  const handleChangeTextFiled = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
      if (!validateEmailFormat(event.target.value)) {
        setEmailFormatValid(true);
      } else {
        setEmailFormatValid(false);
      }
    }
    if (event.target.name === 'authCode') {
      setAuthCode(event.target.value);
    }
  };

  const handleClickEmailValidBtn = async () => {
    try {
      const result = await AuthStore.sendAuthCode(email);
      setRemainTime(result);
      setEmailValid(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setHasEmailUser(true);
        }
      }
    }
  };

  const handleClickVerifyBtn = async () => {
    try {
      await AuthStore.verifyAuthCode(email, authCode);
      setMode(true);
    } catch (error) {
      setAuthErrMsg('잘못된 인증 코드입니다');
      console.error(error);
    }
  };

  const createHelperText = () => {
    if (isEmailFormatValid) {
      return '이메일 형식이 잘못되었어요';
    }
    if (hasEmailUser) {
      return 'email과 일치하는 회원 정보가 없어요';
    }
    return null;
  };

  return (
    <div style={{ margin: '2rem' }}>
      {!mode ? (
        <>
          <div>비밀번호 변경</div>
          <EmailWrapper>
            <TextFieldDiv>
              <TextField
                autoComplete="off"
                error={isEmailFormatValid}
                helperText={createHelperText()}
                autoFocus
                required
                className="email"
                id="email"
                name="email"
                type="email"
                variant="standard"
                placeholder="이메일 입력"
                onChange={handleChangeTextFiled}
                margin="normal"
                fullWidth
              />
            </TextFieldDiv>
            <Button onClick={handleClickEmailValidBtn}>인증 코드 발송</Button>
          </EmailWrapper>
          {emailValid ? (
            <AuthCodeWrapper>
              <TextFieldDiv>
                <TextField
                  autoComplete="off"
                  error={!mode}
                  helperText={authErrMsg}
                  autoFocus
                  required
                  className="authCode"
                  id="authCode"
                  name="authCode"
                  type="text"
                  variant="standard"
                  placeholder="인증 코드 171009"
                  onChange={handleChangeTextFiled}
                  margin="normal"
                  fullWidth
                />
                <Countdown
                  date={Date.now() + remainTime}
                  intervalDelay={1000}
                  renderer={props => <div>{`${props.minutes}:${props.seconds}`}</div>}
                />
              </TextFieldDiv>
              <Button onClick={handleClickVerifyBtn}>확인</Button>
            </AuthCodeWrapper>
          ) : null}
        </>
      ) : (
        <ReSettingPw />
      )}
    </div>
  );
};

const EmailWrapper = styled('div')`
  display: flex;
`;

const TextFieldDiv = styled('div')`
  width: 300px;
`;

const AuthCodeWrapper = styled(`div`)`
  display: flex;
`;

export default ReSettingPwVerify;
