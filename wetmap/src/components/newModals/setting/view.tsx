import screenData from '../screenData.json';
import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import Button from '../../reusables/button';

type SettingsProps = {
  onClose:      () => void
  handleLogout: () => Promise<void>
};

export default function SettingsView(props: SettingsProps) {
  return (
    <>
      <div className={styles.buttonBack}>
        <ButtonIcon
          icon={<Icon name="chevron-left" />}
          className="btn-lg text-gray ml-4 mt-4"
          onClick={props.onClose}
        />
      </div>
      <div className="mx-10 text-left">
        <h1 className="mt-4 text-bold">{screenData.SettingsPage.header}</h1>
        <h2 className="ml-4 mt-2 mb-1">{screenData.SettingsPage.subHeading1}</h2>
        <div className={styles.outline}>
          <h4 className="ml-8 mb-0 mt-1 text-bold text-dark">Diver Account</h4>
          <p className="ml-10 mb-1 p-0 text-bold text-primary">{screenData.SettingsPage.notPartnerAccount}</p>
        </div>
        <div className={styles.horizontalButtonContainer}>
          <div className="col-3"></div>
          <div className="col-3">
            <Button
              onClick={props.handleLogout}
              className="btn-md bg-primary"
              iconRight={<Icon name="chevron-right" />}
              type="button"
            >
              {screenData.SettingsPage.logout}
            </Button>
          </div>
        </div>
      </div>

    </>
  );
}
