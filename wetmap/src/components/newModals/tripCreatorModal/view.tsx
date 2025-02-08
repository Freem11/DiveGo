import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import screenData from '../screenData.json';
import TextInput from '../../reusables/textInput';
import { Form, FormRules } from './form';
import { FieldErrors, useForm } from 'react-hook-form';
import Button from '../../reusables/button';
import Label from '../../reusables/label';
import PriceTextInput from '../../reusables/priceTextInput';
import SiteSelector from '../../reusables/siteSelector';

type TripCreatorViewProps = {
  onClose?:       () => void
  isEditModeOn:   boolean
  onSubmit:       (data: Form) => void
  handleError:    (errors: FieldErrors<Form>) => void
  diveSitesError: boolean
};

export default function TripCreatorView({ onClose, onSubmit, handleError, isEditModeOn, diveSitesError }: TripCreatorViewProps) {
  const { register, watch, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>();

  const startDate = watch('Start'); // Get start date value from form
  const endDate = watch('End'); // Get end date value from form

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonBack}>
        <ButtonIcon
          icon={<Icon name="chevron-left" />}
          onClick={onClose}
        />
      </div>

      {
        isEditModeOn
          ? (<h2>{screenData.TripCreator.headerEdit}</h2>)
          : (<h2>{screenData.TripCreator.header}</h2>)
      }

      <form onSubmit={handleSubmit(onSubmit, handleError)} className={styles.form}>
        <div className={styles.formColumns}>
          <div className={styles.formColumn}>
            <Label label={screenData.TripCreator.tripNameLabel}>
              <TextInput
                iconLeft={<Icon name="store" />}
                placeholder={screenData.TripCreator.tripNamePlaceholder}
                error={errors.Name}
                {...register('Name', FormRules.Name)}
              />
            </Label>

            <Label label={screenData.TripCreator.bookingLinkLabel}>
              <TextInput
                iconLeft={<Icon name="link" />}
                placeholder={screenData.TripCreator.bookingLinkPlaceholder}
                error={errors.Link}
                {...register('Link', FormRules.Link)}
              />
            </Label>

            <Label label={screenData.TripCreator.priceLabel}>
              <PriceTextInput
                placeholder={screenData.TripCreator.pricePlaceholder}
                error={errors.Price}
                {...register('Price', FormRules.Price)}
              />
            </Label>

            <Label label={screenData.TripCreator.startDateLabel}>
              <TextInput
                iconLeft={<Icon name="calendar-start" />}
                placeholder={screenData.TripCreator.startDatePlaceholder}
                error={errors.Start}
                type="date"
                {...register('Start',
                  { required: 'Start date is required',
                    validate: (value) => {
                      if (!endDate || !value) return true;
                      const end = new Date(endDate);
                      const start = new Date(value);
                      return end >= start || 'Start date must be before end date';
                    },
                  })}
                max={endDate}
              />
            </Label>

            <Label label={screenData.TripCreator.endDateLabel}>
              <TextInput
                iconLeft={<Icon name="calendar-end" />}
                placeholder={screenData.TripCreator.endDatePlaceholder}
                error={errors.End}
                type="date"
                {...register('End',
                  { required: 'End date is required',
                    validate: (value) => {
                      if (!startDate || !value) return true;
                      const start = new Date(startDate);
                      const end = new Date(value);
                      return end >= start || 'End date must be after start date';
                    },
                  })}
                min={startDate}
              />
            </Label>

          </div>
          <div className={styles.formColumn}>
            <Label label={screenData.TripCreator.diveSitesLabel}>
              <SiteSelector error={diveSitesError} />
            </Label>
            <Label label="Details" className={styles.detailsField}>
              <textarea
                className={`${styles.textarea} ${errors.Details && styles.textareaError}`}
                placeholder={screenData.TripCreator.tripDescriptionPlaceholder}
                {...register('Details', FormRules.Details)}
              />
            </Label>
          </div>
        </div>
        <div className={styles.formBottom}>
          <div className={styles.buttonWrapper}>
            <Button
              className="btn-primary w-fit"
              disabled={isSubmitting}
              type="submit"
              iconRight={<Icon name="chevron-right" />}
            >
              {screenData.TripCreator.submitButton}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
