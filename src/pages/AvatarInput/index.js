import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdInsertPhoto } from 'react-icons/md';
import PropTypes from 'prop-types';
import api from '~/services/api';
import { Container, ImageAvatar } from './styles';

export default function AvatarInput(props) {
  const { avatarUrl } = props;
  const { defaultValue, registerField } = useField('avatar_id');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post(`/files`, data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [preview, ref, registerField]);

  return (
    <Container>
      <label htmlFor="avatar">
        {preview || avatarUrl ? (
          <img src={preview || avatarUrl} alt="avatar" />
        ) : (
          <ImageAvatar>
            <div>
              <MdInsertPhoto size={55} color="#DDDDDD" className="icon" />
              Adicionar foto
            </div>
          </ImageAvatar>
        )}
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  avatarUrl: PropTypes.string,
};

AvatarInput.defaultProps = {
  avatarUrl: null,
};
