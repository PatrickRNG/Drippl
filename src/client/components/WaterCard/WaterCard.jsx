import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Edit, Trash } from 'client/assets/icons';
import { Flex, Input } from 'client/common/Elements';
import { waterToNumber, convertOzToMl } from 'client/utils/water';
import { measurementNames } from 'client/utils/constants';
import { useConfigState } from 'client/contexts/configContext';
import { useOutsideClick } from 'client/hooks';
import { Card, WaterLabel, Date as CardDate } from './styles';

const WaterCard = ({ value, date, editWater, removeWater }) => {
  const {
    options: { waterMeasurements },
  } = useConfigState();
  const [editMode, setEditMode] = useState(false);
  // Using this separate state, to be able to edit each water without conflict.
  const [water, setWater] = useState(waterToNumber(value, waterMeasurements));

  const ref = useRef();
  const handleEdit = () => {
    if (editMode) {
      setEditMode(false);
      if (waterMeasurements === measurementNames.IMPERIAL) {
        console.log('>> water', water);
        console.log('>> water 2', convertOzToMl(water));
        return editWater(convertOzToMl(water));
      }
      return editWater(water);
    }
  };

  const handleFocus = (event) => event.target.select();

  useEffect(() => {
    setWater(waterToNumber(value, waterMeasurements));
  }, [value]);

  useEffect(() => {
    if (editMode) {
      ref.current.focus();
    }
  }, [editMode]);

  useOutsideClick(ref, () => {
    if (editMode) {
      setEditMode(false);
    }
  });

  return (
    <Card
      layout="position"
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      {editMode ? (
        <Input
          ref={ref}
          readOnly={false}
          type="number"
          align="left"
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          onChange={(e) => setWater(e.target.value)}
          onFocus={handleFocus}
          value={water}
        />
      ) : (
        <WaterLabel>{value}</WaterLabel>
      )}
      <Flex direction="column" justify="space-between">
        <Flex justify="flex-end">
          <span
            className="icon edit"
            onClick={() => setEditMode(true)}
            aria-hidden="true"
          >
            <Edit />
          </span>
          <span
            className="icon delete"
            onClick={removeWater}
            aria-hidden="true"
          >
            <Trash />
          </span>
        </Flex>
        <CardDate>
          {format(date, 'dd/MM')} {format(date, 'hh:mm a')}
        </CardDate>
      </Flex>
    </Card>
  );
};

WaterCard.propTypes = {
  value: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  editWater: PropTypes.func.isRequired,
  removeWater: PropTypes.func.isRequired,
};

export default WaterCard;
