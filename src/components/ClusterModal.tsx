import { ClusterFormField } from "@constants";
import { useClusterModalStore, useClustersStore } from "@states";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

interface ClusterModalFormData {
  name: string;
  remarks: string;
}

export function ClusterModal() {
  const { register, handleSubmit, setValue } = useForm<ClusterModalFormData>();

  const { mode, isOpen, close } = useClusterModalStore();
  const header = useMemo(() => mode.action[0].toUpperCase() + mode.action.slice(1) + " cluster", [mode]);

  const { create: createCluster, update: updateCluster, getById: getClusterById } = useClustersStore();

  useEffect(() => {
    if (mode.action === "update") {
      const targetCluster = getClusterById(mode.id);
      setValue("name", targetCluster.name);
      setValue("remarks", targetCluster.remarks ? targetCluster.remarks : "");
    } else {
      setValue("name", "");
      setValue("remarks", "");
    }
  }, [getClusterById, mode.action, mode.id, setValue]);

  const submit = (formData: ClusterModalFormData) => {
    console.log(formData);
    const payload = {
      name: formData.name,
      remarks: formData.remarks.length === 0 ? null : formData.remarks
    };
    if (mode.action === "create") {
      createCluster(payload).then(() => close());
    } else if (mode.action === "update") {
      updateCluster(mode.id, payload).then(() => close());
    }
  };

  return (
    <Modal show={isOpen} onClose={close} position={"top-center"}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(submit)}>
          <div className='mb-4 block'>
            <Label htmlFor={ClusterFormField.NAME} value='Cluster name*' className='mb-2' placeholder='Insert cluster name ...' />
            <TextInput
              id={ClusterFormField.NAME}
              type='text'
              {...register("name", {
                required: true
              })}
              placeholder='Insert name ...'
              shadow
              autoComplete='off'
            />
          </div>

          <div className='mb-4 block'>
            <Label htmlFor={ClusterFormField.REMARKS} value='Remarks' />
            <Textarea
              id={ClusterFormField.REMARKS}
              {...register("remarks")}
              placeholder='Insert remarks ...'
              rows={4}
              shadow
              autoComplete='off'
            />
          </div>

          <div className='flex justify-end'>
            <Button color={"light"} onClick={close}>
              Cancel
            </Button>
            <Button gradientMonochrome='info' className='ml-2' onClick={close} type='submit'>
              {" "}
              {mode.action[0].toUpperCase() + mode.action.slice(1)}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
