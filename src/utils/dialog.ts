type ConfirmationDialogOptions = {
  title: string;
  content: string;
};

export const confirmationDialog = ({ title, content }: ConfirmationDialogOptions) =>
  new Promise<boolean>((resolve) => {
    new Dialog({
      title,
      content,
      buttons: {
        yes: { label: 'Yes', callback: () => resolve(true) },
        no: { label: 'No', callback: () => resolve(false) },
      },
    }).render(true);
  });
