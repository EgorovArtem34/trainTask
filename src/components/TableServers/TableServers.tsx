import Table from "react-bootstrap/Table";
import styles from "./tableServers.module.scss";
import { IServers } from "../../types";
import { Tag } from "../Tag/Tag";
import { Checkbox } from "../../ui/Checkbox/Checkbox";
import { useAppDispatch } from "../../hooks/hooks";
import { setCheckedServers } from "../../store/slices/serversSlice";

export const TableServers = ({ servers }: { servers: IServers[] }) => {
  const dispatch = useAppDispatch();

  const handleChange = (currentId: string | number, newValue: boolean) => {
    dispatch(setCheckedServers({ currentId, newValue }));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            {
              <Checkbox
                id={"all"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("all", e.target.checked)
                }
              />
            }
          </th>
          <th>Название</th>
          <th>Тип</th>
          <th>Расположение</th>
          <th>Орг.единица</th>
          <th>Инв.номер</th>
          <th>Теги</th>
          <th>Дата создания</th>
          <th>Дата обновления</th>
          <th>Дата аудита</th>
        </tr>
      </thead>
      <tbody>
        {servers.map((server) => (
          <tr key={server.id} className={styles.serverElements}>
            <td>
              {
                <Checkbox
                  id={server.id.toString()}
                  checked={server.isChecked}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(server.id, e.target.checked)
                  }
                />
              }
            </td>
            <td>{server.name}</td>
            <td>{server.type}</td>
            <td>{server.location}</td>
            <td>{server.organizationalUnit}</td>
            <td>{server.inventoryNumber}</td>
            <td>
              {server.tags.length > 0 ? (
                <Tag tag={server.tags[0]} tagsCount={server.tags.length} />
              ) : (
                ""
              )}
            </td>
            <td>{server.creationDate}</td>
            <td>{server.updateDate}</td>
            <td>{server.auditDate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
