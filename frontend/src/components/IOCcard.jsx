import "../styles/IOCcard.css";

import {
    extractIPs,
    extractDomains,
    extractFiles,
    extractUsers
} from "../utils/iocUtils";

function IOCCards({ report }) {
    const ips = extractIPs(report);
    const domains = extractDomains(report);
    const files = extractFiles(report);
    const users = extractUsers(report);
 return(
         <div className="ioc-container">

            {ips.length > 0 && (
                <div className="ioc-card">
                   <h3>🌐 IP Addresses</h3>
                    {ips.map((ip, index) => (
                        <p key={index}>{ip}</p>

                    ))}
                  </div>

            )}

            {domains.length > 0 && (

                <div className="ioc-card">
                  <h3>🌍 Domains</h3>
                    {domains.map((domain, index) => (
                    <p key={index}>{domain}</p>

                    ))}
                 </div>

            )}

            {files.length > 0 && (

                <div className="ioc-card">

                    <h3>📄 Files</h3>

                    {files.map((file, index) => (

                        <p key={index}>{file}</p>

                    ))}

                </div>

            )}

            {users.length > 0 && (

                <div className="ioc-card">

                    <h3>👤 Users</h3>

                    {users.map((user, index) => (

                        <p key={index}>{user}</p>

                    ))}

                </div>

            )}

        </div>

    );

}

export default IOCCards;