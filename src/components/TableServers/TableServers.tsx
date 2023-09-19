import Table from "react-bootstrap/Table";
import styles from "./tableServers.module.scss";
import { IServers } from "../../types";
import { Tag } from "../Tag/Tag";

export const TableServers = ({ servers }: { servers: IServers[] }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
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
            <td>1</td>
            <td>{server.name}</td>
            <td>{server.type}</td>
            <td>{server.location}</td>
            <td>{server.organizationalUnit}</td>
            <td>{server.inventoryNumber}</td>
            <td>
              {server.tags.length > 0 ? <Tag tag={server.tags[0]} tagsCount={server.tags.length} /> : ''}
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
