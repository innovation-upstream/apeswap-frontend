export const styles = {
  infoRow: {
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '5px',
  },
  linkRow: {
    width: '100%',
    marginTop: '5px',
    justifyContent: 'flex-end',
    '& svg': { width: '11px' },
  },
  titleText: {
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: 500,
  },
  contentText: {
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: 700,
  },
  iconButton: {
    background: 'lvl1',
    width: 'fit-content',
    padding: '2px 4px',
    borderRadius: '8px',
    margin: '0 5px 5px 0',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}
