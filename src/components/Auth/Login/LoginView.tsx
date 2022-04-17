import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { validateEmailFormat } from '@utils/Utils';

interface Props {
  onLogin: () => Promise<number>;
}

const LoginView = ({ onLogin }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isIdValid, setIdValid] = useState<boolean>(false);
  const [isPwEmpty, setPwEmpty] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const init = () => {
    setOpen(false);
    setPwEmpty(false);
    setIdValid(false);
    setIsError(false);
  };

  const handleClose = () => {
    init();
  };

  const handleClickBtn = () => setOpen(true);

  const handleChangeTextFiled = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.name === 'id') {
      if (!validateEmailFormat(event.target.value)) {
        setIdValid(true);
      } else {
        setIdValid(false);
      }
    } else if (event.target.name === 'pw') {
      setPwEmpty(!!event.target.value);
    }
  };

  const handleClickSubmitBtn = async () => {
    const loginSucess = await onLogin();
    if (loginSucess === 200) {
      handleClose();
    } else {
      setIsError(true);
    }
  };

  return (
    <div>
      <LoginBtn onClick={handleClickBtn}>Login</LoginBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            autoComplete="off"
            error={isIdValid}
            helperText={isIdValid && '이메일 형식이 잘못되었어요'}
            autoFocus
            required
            className="id"
            id="id"
            name="id"
            type="id"
            fullWidth
            variant="standard"
            placeholder="이메일 입력"
            onChange={handleChangeTextFiled}
            margin="normal"
          />
          <TextField
            required
            id="pw"
            name="pw"
            className="pw"
            type="password"
            placeholder="비밀번호 입력"
            variant="standard"
            fullWidth
            onChange={handleChangeTextFiled}
            margin="normal"
          />
          <SubmitBtn onClick={handleClickSubmitBtn} disabled={!(!isIdValid && isPwEmpty)}>
            로그인
          </SubmitBtn>
          {isError && <ErrorTextDiv>이메일 또는 비밀번호가 틀렸습니다</ErrorTextDiv>}
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 200,
  bgcolor: 'background.paper',
  border: '1px solid #ffffff',
  boxShadow: 24,
  p: 4,
};

const LoginBtn = styled(Button)`
  color: black;
  border-radius: 3rem;
  border-color: #ffffff;
  background-color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  &:hover {
    border-color: #ffffff;
    background-color: #ffffff;
  }
`;

const SubmitBtn = styled(Button)`
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  background-color: black;
  width: 100%;
  margin: 2rem 0 0 0;
  &:disabled {
    border-color: #ccc;
    background-color: #ccc;
  }
`;

const ErrorTextDiv = styled('div')`
  text-align: center;
  margin: 1rem 0 0 0;
  font-size: 12px;
`;

export default LoginView;
