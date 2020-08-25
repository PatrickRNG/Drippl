import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Edit, Trash } from 'assets/icons';
import { Flex, Input } from 'common/Elements';
import { waterToNumber } from 'utils/water';
import { useOutsideClick } from 'hooks';
import { Card, WaterLabel, Date } from './styles';

const WaterCard = ({ value, date, editWater, removeWater }) => {
  const [editMode, setEditMode] = useState(false);
  const [water, setWater] = useState(waterToNumber(value));
  const ref = useRef();

  const handleEdit = () => {
    if (editMode) {
      setEditMode(false);
      editWater(water);
    }
  };

  const handleFocus = (event) => event.target.select();

  useEffect(() => {
    setWater(waterToNumber(value));
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
    <Card>
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
        <Date>
          {format(date, 'dd/MM')} {format(date, 'hh:mm')}
        </Date>
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
