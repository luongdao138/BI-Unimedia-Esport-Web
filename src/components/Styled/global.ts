import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { Colors } from '@theme/colors'

export const LoginStyledPrimary = styled(Button)`
  color: #3a3a3c;
  background: transparent linear-gradient(180deg, #ffe600 0%, #f2cd5c 100%, #fb5c69 100%, #fd6161 100%) 0% 0% no-repeat padding-box;
  border-radius: 20px;
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  flex: 1;
  margin-right: 5px;
  margin-left: 5px;
  @media (max-width: 768px) {
    flex: none;
  }

  a {
    text-decoration: none;
    color: #3a3a3c;
  }
`

export const LoginStyledSecondary = styled(Button)`
  background: transparent;
  border: 1px solid ${Colors.primary};
  color: ${Colors.primary};
  border-radius: 20px;
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
  @media (max-width: 768px) {
    flex: none;
  }

  a {
    text-decoration: none;
    color: ${Colors.primary};
  }
`

export const SocialAccountsDivider = styled.div<any>`
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  color: #efeff4;

  &:before,
  &:after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #707070;
  }

  &:before {
    margin-right: ${(props: { margin: string }) => props.margin || '6px'};
  }

  &:after {
    margin-left: ${(props: { margin: string }) => props.margin || '6px'};
  }
`
